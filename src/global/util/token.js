import { encodeToFormData } from './formData';
import { NativeError } from '../errors';
import { utilities, biometrics, push } from '../../native-services';
import { getDeviceId } from './queries';
import constants from '../constants';
import Config from 'react-native-config';
import { Platform } from 'react-native';

/**
 * @module TokenUtilities
 *
 */

/**
 * Evaluate a token and returns a boolean if a token has expired or not.
 * @param {Number} expiresAt - Epoch Time (in seconds) at which token expires
 * @returns Boolean expressing if a token is valid till now.
 */

function isTokenValid(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    const TOKEN_EXPIRY_SECONDS_THRESHOLD = 5;
    const valid =
        expiresAt > currentTime &&
        expiresAt - currentTime > TOKEN_EXPIRY_SECONDS_THRESHOLD;
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

/**
 * @typedef {object} TokenReqBodyOptions
 * @property {string} [code] - Client Code for requesting the token at initial
 * @property {string} [refreshToken] - Refresh Token for a new token
 * @property {string} [accountName] - Account name to send with token request
 */

/**
 * Returns URL encoded form body. Specify `code` if requesting while registering new account, otherwise
 * specify `refreshToken` if requesting a new token for already registered account.
 * @param {TokenReqBodyOptions} tokenReqBodyOptions -
 * @returns {Promise<string>}  URLEncodedForm body
 */

async function getTokenRequestBody({
    refreshToken = '',
    code = '',
    accountName = ''
}) {
    let deviceData, uuid;
    try {
        deviceData = await utilities.getDeviceInfo();
        uuid = await (await utilities.getUUID()).uuid;

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

    // following are the requires attribures for token. Some attributes are added on request type
    // i.e. Refresh Token or get a new token
    const raw = {
        client_id: 'AuthenticatorClient',
        scope: 'mmfaAuthn',
        front_camera_support: deviceData.frontCameraAvailable,
        tenant_id: uuid,
        device_id: deviceData.deviceId,
        os_version: deviceData.osVersion,
        device_type: Platform.OS === 'android' ? 'Android' : 'iPhone',
        application_id:
            Platform.OS === 'android'
                ? Config.APPLICATION_ID
                : Config.BUNDLE_ID,
        device_rooted: deviceData.rooted,
        device_name: deviceData.name,
        platform_type: Platform.OS === 'android' ? 'Android' : 'IOS',
        face_support: false,
        account_name: accountName,
        fingerprint_support: deviceData.isFingerprintSupported,
        push_token: deviceData?.pushToken
    };

    //for initially requesting a token
    code && ((raw['grant_type'] = 'authorization_code'), (raw['code'] = code));

    //for refreshing the token
    refreshToken &&
        ((raw['grant_type'] = 'refresh_token'),
        (raw['refresh_token'] = refreshToken));

    return encodeToFormData(raw);
}

export default { getTokenExpiryInSeconds, isTokenValid, getTokenRequestBody };
export { getTokenExpiryInSeconds, isTokenValid, getTokenRequestBody };
