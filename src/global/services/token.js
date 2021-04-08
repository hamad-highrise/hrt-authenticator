import { getToken as getTokenFromDb, updateTokenDb } from './db';
import { getRefreshedToken } from './api';
import { biometrics, cipher, push, utilities } from '../../native-services';
import {
    isTokenValid,
    encodeToFormData,
    getTokenExpiryInSeconds as getTokenExpiryInEpochSeconds
} from '../util';
import constants from '../constants';
import { NativeError, SAMError, TokenError } from '../errors';
import { Platform } from 'react-native';

/**
 * Gives the token for the given account ID. If token has been expired, it will refresh it and return upated token.
 * **WARNING:** Device deletion hav to be handeled separately.
 * @param {Number} accId - Account ID for which Access token is required.
 * @returns Access Token
 */

async function getAccessToken(accId) {
    try {
        const { accessToken, expiresAt, ...token } = await getTokenFromDb(
            accId
        );

        if (isTokenValid(expiresAt)) {
            const { decrypted: decryptedAccessToken } = await cipher.decrypt({
                keyAlias: constants.KEY_ALIAS.TOKEN,
                cipherText: token
            });
            return decryptedAccessToken;
        } else {
            //token has been expired
            const { refreshToken, endpoint } = token;
            const { decrypted: decryptedRefreshToken } = await cipher.decrypt({
                keyAlias: constants.KEY_ALIAS.TOKEN,
                cipherText: refreshToken
            });
            //TODO: get ignoreSsl option
            const body = await getTokenRefreshBody(decryptedRefreshToken);
            const result = await getRefreshedToken({
                endpoint,
                formEncodedBody: body
            });
            if (result.respInfo.status === 200) {
                const {
                    access_token: updatedAccessToken,
                    refresh_token: updatedRefreshToken,
                    //expires_in is after how many seconds token will expire
                    expires_in: expiresAfter
                } = await result.json();
                let encrypted = { accessToken: '', refreshToken: '' };
                try {
                    const result = await cipher.encrypt({
                        keyAlias: constants.KEY_ALIAS.TOKEN,
                        payload: updatedAccessToken
                    });
                    encrypted.accessToken = await result.cipherText;
                    const result2 = await cipher.encrypt({
                        keyAlias: constants.KEY_ALIAS.TOKEN,
                        payload: updatedRefreshToken
                    });
                    encrypted.refreshToken = result2.cipherText;
                } catch (error) {
                    throw new NativeError({ message: 'ENCRYPTION_ERROR' });
                }
                await updateTokenDb({
                    token: encrypted.accessToken,
                    refreshToken: encrypted.refreshToken,
                    expiry: getTokenExpiryInEpochSeconds(expiresAfter)
                });

                return {
                    accessToken: updatedAccessToken
                };
            } else if (result.respInfo.status === 400) {
                throw result.json()?.operation === 'login'
                    ? new TokenError({
                          message: 'ACCOUNT_DELETED_MANUALLY'
                      })
                    : new SAMError({ message: 'BAD_REQUEST' });
            }
        }
    } catch (error) {
        throw error;
    }
}

export default { getAccessToken };
export { getAccessToken };

// TODO: Generalize it for access token as well as for refresh token and
// Shift to some general folder

async function getTokenRefreshBody({ refreshToken }) {
    let deviceData;
    try {
        deviceData = await utilities.getDeviceInfo();
        const isFingerprintSupported = await (
            await biometrics.isSensorAvailable()
        ).available;
        const { pushToken } = await push.getFirebaseToken();
        deviceData = { ...deviceData, pushToken, isFingerprintSupported };
    } catch (error) {
        throw new NativeError({ message: 'Error getting device info.' });
    }
    const raw = {
        refresh_token: refreshToken,
        client_id: 'AuthenticatorClient',
        grant_type: 'refresh_token',
        scope: 'mmfaAuthn',
        front_camera_support: deviceData.frontCameraAvailable,
        tenant_id: '',
        device_id: '',
        os_version: deviceData.osVersion,
        device_type: deviceData.type,
        application_id: constants.APP_INFO.APPLICATION_ID,
        device_rooted: deviceData.rooted,
        device_name: deviceData.name,
        platform_type: Platform.OS === 'android' ? 'Android' : 'iOS',
        face_support: false,
        account_name: '',
        fingerprint_support: deviceData.isFingerprintSupported,
        push_token: deviceData.pushToken
    };
    return encodeToFormData(raw);
}
