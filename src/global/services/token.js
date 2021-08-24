import { getToken as getTokenFromDb, updateTokenDb } from './db';
import { getRefreshedToken } from './api';
import { cipher } from '../../native-services';
import {
    isTokenValid,
    getTokenExpiryInSeconds as getTokenExpiryInEpochSeconds,
    getTokenRequestBody,
    getIgnoreSslOption
} from '../util';
import constants from '../constants';
import { DatabaseError, NativeError, SAMError, TokenError } from '../errors';

/**
 * Gives the token for the given account ID. If token has been expired, it will refresh it and return upated token.
 * **WARNING:** Device deletion have to be handeled separately.
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
                cipherText: accessToken
            });
            return decryptedAccessToken;
        } else {
            // TODO: Convert to a local function.
            //token has been expired

            const { refreshToken, endpoint } = token;
            const ignoreSsl = await getIgnoreSslOption(accId);
            const { decrypted: decryptedRefreshToken } = await cipher.decrypt({
                keyAlias: constants.KEY_ALIAS.TOKEN,
                cipherText: refreshToken
            });

            //TODO: get ignoreSsl option

            const body = await getTokenRequestBody({
                refreshToken: decryptedRefreshToken
            });

            const result = await getRefreshedToken({
                endpoint,
                formEncodedBody: body,
                ignoreSsl
            });
            const { status } = result.respInfo;
            if ((status >= 200 && status < 299) || status === 304) {
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
                    await updateTokenDb({
                        token: encrypted.accessToken,
                        refreshToken: encrypted.refreshToken,
                        expiry: getTokenExpiryInEpochSeconds(expiresAfter),
                        accId
                    });
                } catch (error) {
                    throw error instanceof DatabaseError
                        ? error
                        : new NativeError({ message: 'ENCRYPTION_ERROR' });
                }

                return updatedAccessToken;
            } else {
                if (status >= 500)
                    throw new SAMError({
                        message: result.json()?.error_description
                    });
                if (status >= 400 && status < 500) {
                    const errDescription = result.json()['error_description'];
                    const splitted = errDescription.split(' ');
                    if (
                        splitted[0] ===
                        constants.SAM_ERROR_CODE.AUTH_GRANT_NOT_EXIST
                    ) {
                        throw new TokenError({
                            message: 'DEVICE_DELETED_MANUALLY'
                        });
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

export default { getAccessToken };
export { getAccessToken };
