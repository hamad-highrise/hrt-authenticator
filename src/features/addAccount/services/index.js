import CookieManager from '@react-native-cookies/cookies';

import getDetails from './getDetails';
import getToken from './getToken';
import createAccount from './createAccount';
import registerMethods from './registerMethods';
import { constants } from '../../../global';
import URL from 'url-parse';

const result = { serviceName: '', accId: '', methods: [], type: '' };

/**
 * @namespace AddAccount.Services
 * @property {module:API} API
 */

export default async function registerDevice(scanned) {
    const isValidMmfaData = checkQrValidity(scanned);
    if (isValidMmfaData) {
        const ignoreSsl = getIgnoreSslOption(scanned?.options) || false;

        try {
            const { hostname } = new URL(scanned['details_url']);

            await CookieManager.clearAll();

            // Get details for the account
            const details = await getDetails({
                endpoint: scanned?.['details_url'],
                ignoreSsl
            });

            // Fetch token
            const token = await getToken({
                endpoint: details.endpoints.token,
                ignoreSsl,
                code: scanned.code
            });

            // register totp
            const totp = await registerMethods.totp({
                endpoint: details.endpoints.otp,
                ignoreSsl,
                token: token.unsafeToken
            });

            // create account entry in db
            const accId = await createAccount({
                account: {
                    name: token.accountName,
                    issuer: details?.serviceName || hostname,
                    secret: totp.secretKey,
                    type: constants.ACCOUNT_TYPES.SAM,
                    ignoreSsl,
                    transactionEndpoint: details.endpoints.transaction,
                    enrollmentEndpoint: details.endpoints.enrollment,
                    authId: token.authenticatorId
                },
                token: {
                    token: token.accessToken,
                    refreshToken: token.refreshToken,
                    expiry: token.expiry,
                    tokenEndpoint: details.endpoints.token
                }
            });

            await registerMethods.userPresence({
                endpoint: details.endpoints.enrollment,
                token: token.unsafeToken,
                accId,
                ignoreSsl
            });

            return {
                serviceName: details.serviceName,
                accId,
                methods: details.methodsSupported,
                type: constants.ACCOUNT_TYPES.SAM
            };
        } catch (error) {
            throw error;
        }
    } else {
        return;
    }
}

export { isUnique } from './queries';
export { default as createAccount } from './createAccount';
export { default as parser } from './parser';

//helpers
/**
 *
 * @param {{*}} scanned
 * @returns {boolean} - Scanned QR Code object contains required values
 */
function checkQrValidity(scanned) {
    return scanned?.code && scanned.details_url;
}

/**
 *
 * @param {{*}} options
 * @returns {boolean} - Boolean indicating to ignore SSL or not
 */

function getIgnoreSslOption(options) {
    const splitted = options?.split('=');
    return (
        (splitted?.shift() === 'ignoreSslCerts' &&
            splitted?.shift() == 'true') ??
        false
    );
}
