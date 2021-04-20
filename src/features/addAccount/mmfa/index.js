import api from './api';
import methods from './registerMethods';
import { cipher } from '../../../native-services';

import { createAccount, isUnique } from '../services'; //folder related services
import { utils, constants } from '../../../global';
import { SAMError, TokenError } from '../../../global/errors';

async function initiate(scanned) {
    const resultObj = {
        accountName: '',
        insertId: 0
    };
    const isValidMmfaObj = scanned?.code && scanned?.details_url;
    let ignoreSsl = false;
    if (!isValidMmfaObj) {
        resultObj.message = 'INVALID_MMFA_OBJECT';
        return resultObj;
    }
    if (scanned?.options) {
        const splitted = scanned.options.split('=');
        if (splitted.shift() === 'ignoreSslCerts') {
            ignoreSsl = splitted.shift() == 'true'; // not strict identity
        }
    }

    try {
        const details = await getDetails({ endpoint: scanned['details_url'] });

        if (!details) {
            resultObj.message = constants.ERROR_MESSAGES.DETAILS_FETCH;
            return resultObj;
        }

        const {
            tokenEndpoint,
            totpEndpoint,
            enrollmentEndpoint,
            transactionEndpoint,
            serviceName,
            methodsSupported
        } = details;

        const tokenT = await getToken({
            endpoint: tokenEndpoint,
            code: scanned.code
        });

        if (!tokenT) {
            resultObj.message = constants.ERROR_MESSAGES.TOKEN_FETCH;
            return resultObj;
        }

        if (
            !(await isUnique({ name: tokenT.accountName, issuer: serviceName }))
        ) {
            resultObj.message = constants.ERROR_MESSAGES.DUPLICATE_ACCOUNT;
            return Promise.resolve(resultObj);
        }

        const totp = await totpRegistraion({
            endpoint: totpEndpoint,
            token: tokenT.unsafeToken
        });

        if (!totp) {
            resultObj.message = constants.ERROR_MESSAGES.TOTP_REGISTER;
            return resultObj;
        }

        const account = {
            name: tokenT.accountName,
            issuer: serviceName,
            secret: totp.secretKey,
            type: constants.ACCOUNT_TYPES.SAM,
            ignoreSsl: ignoreSsl,
            transactionEndpoint,
            enrollmentEndpoint,
            authId: tokenT.authenticatorId
        };
        const token = {
            token: tokenT.accessToken,
            refreshToken: tokenT.refreshToken,
            expiry: tokenT.expiry,
            tokenEndpoint
        };

        const accId = await createAccount({ account, token });

        await userPresenceRegistration({
            endpoint: enrollmentEndpoint,
            token: tokenT.unsafeToken,
            accId: accId
        });

        resultObj.accountName = account.name;
        resultObj.issuer = account.issuer;
        resultObj.insertId = accId;
        resultObj.methods = methodsSupported;

        return Promise.resolve(resultObj);
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

async function totpRegistraion({ endpoint, token }) {
    try {
        const result = await methods.registerTotp({ endpoint, token });
        if (result.respInfo.status !== 200) {
            if (result.respInfo.status >= 400 && result.respInfo.status < 500)
                throw new TokenError({
                    message: 'ERROR_REGISTERING_TOTP',
                    displayMessage:
                        'An error was occurred while registering TOTP.'
                });

            if (result.respInfo.status >= 500)
                throw new SAMError({
                    message: 'ERROR_REGISTERING_TOTP',
                    displayMessage: 'An error occurred while registering TOTP.'
                });
        }
        const totp = await result.json();
        return {
            period: totp['period'],
            digit: totp['digits'],
            secretKey: totp['secretKey'],
            algorithm: totp['algorithm']
        };
    } catch (error) {
        throw error;
    }
}

async function userPresenceRegistration({ endpoint, token, accId }) {
    try {
        const result = await methods.registerUserPresence({
            endpoint,
            token,
            accId
        });
        if (result.respInfo.status !== 200) {
            throw new SAMError({ message: 'ERROR_REGISTERING_USER_PRESENCE' });
        }
        return;
    } catch (error) {
        throw error;
    }
}

async function getDetails({ endpoint, ignoreSSL }) {
    try {
        const result = await api.getDetails({ endpoint, ignoreSSL });
        if (result.respInfo.status !== 200) {
            throw new SAMError({
                message: 'ERROR_GETTING_SAM_DETAILS',
                displayMessage: 'Unable to get details from SAM.'
            });
        }
        const details = await result.json();
        return {
            totpEndpoint: details['totp_shared_secret_endpoint'],
            enrollmentEndpoint: details['enrollment_endpoint'],
            transactionEndpoint: details['authntrxn_endpoint'],
            tokenEndpoint: details['token_endpoint'],
            serviceName: details['metadata']['service_name'],
            methodsSupported: details['discovery_mechanisms'].map((mech) =>
                mech.split(':').pop()
            )
        };
    } catch (error) {
        throw error;
    }
}

async function getToken({ endpoint, code, ignoreSSL }) {
    try {
        const body = await utils.getTokenRequestBody({ code });
        const result = await api.getToken({
            endpoint,
            formEncodedData: body,
            ignoreSSL
        });

        if (result.respInfo.status !== 200) {
            throw new SAMError({ message: 'ERROR_FETCHING_TOKEN' });
        }
        const token = await result.json();
        const { cipherText: encryptedToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.TOKEN,
            payload: token['access_token']
        });
        const { cipherText: encryptedRefreshToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.TOKEN,
            payload: token['refresh_token']
        });

        return {
            accessToken: encryptedToken,
            unsafeToken: token['access_token'],
            refreshToken: encryptedRefreshToken,
            expiry: utils.getTokenExpiryInSeconds(token['expires_in']),
            endpoint,
            authenticatorId: token['authenticator_id'],
            accountName: token['display_name']
        };
    } catch (error) {
        throw error;
    }
}

export default initiate;
