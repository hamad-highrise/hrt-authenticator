import helpers from '../../../helpers';
import getDetails from './getDetails';
import getToken from './getToken';
import createAccount from './createAccount';
import registerMethods from './registerMethods';
import { constants } from '../../../global';

const result = { serviceName: '', accId: '', methods: [], type: '' };

export default async function registerDevice(scanned) {
    const isValidMmfaData = helpers.checkQrValidity(scanned);
    if (isValidMmfaData) {
        let ignoreSsl = helpers.getIgnoreSslOption(scanned?.options) || false;
        try {
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
                    issuer: details.serviceName,
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
