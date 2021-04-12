import { encodeToFormData } from './formData';
import { NativeError } from '../errors';
import { utilities, biometrics } from '../../native-services';

/**
 * Evaluate a token and returns a boolean if a token has expired or not.
 * @param {Number} expiresAt - Epoch Time (in seconds) at which token expires
 * @returns Boolean expressing if a token is valid till now.
 */

function isTokenValid(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    const valid = expiresAt > currentTime && expiresAt - currentTime > 5;
    return valid;
}

/**
 * Converts given seconds duration to Epoch time(in seconds)
 * @param {Number} expiresIn - Duration for which token is valid.
 * @returns  Epoch time (in  seconds) at which token will expire
 */

function getTokenExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

async function getTokenRequestBody({ refreshToken, code }) {
    let deviceData;
    try {
        deviceData = await utilities.getDeviceInfo();
        const isFingerprintSupported = await (
            await biometrics.isSensorAvailable()
        ).available;
        const { pushToken } = await push.getFirebaseToken();
        const deviceId = await getDeviceId();
        deviceData = {
            ...deviceData,
            pushToken,
            isFingerprintSupported,
            deviceId
        };
    } catch (error) {
        throw new NativeError({ message: 'Error getting device info.' });
    }

    const raw = {
        client_id: 'AuthenticatorClient',
        scope: 'mmfaAuthn',
        front_camera_support: deviceData.frontCameraAvailable,
        tenant_id: '',
        device_id: deviceData.deviceId,
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

    //for initial token
    code && ((raw['grant_type'] = 'authorization_code'), (raw['code'] = code));

    //for refresh token
    refreshToken &&
        ((raw['grant_type'] = 'refresh_token'),
        (raw['refresh_token'] = refreshToken));

    return encodeToFormData(raw);
}

export default { getTokenExpiryInSeconds, isTokenValid, getTokenRequestBody };
export { getTokenExpiryInSeconds, isTokenValid, getTokenRequestBody };
