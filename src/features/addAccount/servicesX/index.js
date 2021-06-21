import helpers from '../../../helpers';
import getDetails from './getDetails';
import getToken from './getToken';
import createAccount from './createAccount';
import registerMethods from './registerMethods';
import { constants } from '../../../global';

export default async function resgisterDevice(scanned) {
    const isValidMmfaData = helpers.checkQrValidity(scanned);
    if (isValidMmfaData) {
        let ignoreSsl = helpers.getIgnoreSslOption(scanned?.options);
        console.warn('ignoreSsl', ignoreSsl);
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
        } catch (error) {}
    } else {
        return;
    }
}
