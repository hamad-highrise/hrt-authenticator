import { Platform } from 'react-native';
import api from './api';
import methods from './registerMethods';
import { push, biometrics, utilities, cipher } from '../../../native-services';
import { createAccount, isUnique } from '../services'; //folder related services
import { constants, getDeviceId } from '../../services';
import { utils } from '../../../global';

async function initiate(scanned) {
    const resultObj = {
        message: 'OKAY',
        enrollmentEndpoint: '',
        token: '',
        accountName: '',
        insertId: 0
    };
    const isValidMmfaObj = scanned?.code && scanned?.details_url;
    let ignoreSSL = false;
    if (!isValidMmfaObj) {
        resultObj.message = 'INVALID_MMFA_OBJECT';
        return resultObj;
    }
    if (scanned?.options) {
        const splitted = scanned.options.split('=');
        if (splitted.shift() === 'ignoreSslCerts') {
            ignoreSSL = splitted.shift() == 'true'; // not strict identity
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

        const data = await getData();
        //set code from scanned QR code
        data['code'] = scanned.code;

        const tokenT = await getToken({ endpoint: tokenEndpoint, data });

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

        const registered = await userPresenceRegistration({
            endpoint: enrollmentEndpoint,
            token: tokenT.unsafeToken,
            name: tokenT.accountName,
            issuer: serviceName,
            accId: accId
        });

        if (!registered) {
            resultObj.message = constants.ERROR_MESSAGES.USER_PRESENCE_REGISTER;
            return resultObj;
        }

        resultObj.enrollmentEndpoint = account.enrollmentEndpoint;
        resultObj.token = token.token;
        resultObj.accountName = account.name;
        resultObj.issuer = account.issuer;
        resultObj.insertId = accId;

        return Promise.resolve(resultObj);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function totpRegistraion({ endpoint, token }) {
    try {
        const result = await methods.registerTotp({ endpoint, token });
        if (result.respInfo.status !== 200) {
            console.warn(result.json());
            return Promise.resolve();
        }
        const totp = await result.json();
        return Promise.resolve({
            period: totp['period'],
            digit: totp['digits'],
            secretKey: totp['secretKey'],
            algorithm: totp['algorithm']
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function userPresenceRegistration({
    endpoint,
    token,
    name,
    issuer,
    accId
}) {
    try {
        const result = await methods.registerUserPresence({
            endpoint,
            token,
            name,
            issuer,
            accId
        });
        if (result.respInfo.status !== 200) {
            console.warn(result.json());
            return Promise.resolve();
        }
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getDetails({ endpoint, ignoreSSL }) {
    try {
        const result = await api.getDetails({ endpoint, ignoreSSL });
        if (result.respInfo.status !== 200) {
            console.warn(result.json());
            return Promise.resolve();
        }
        const details = await result.json();
        return Promise.resolve({
            totpEndpoint: details['totp_shared_secret_endpoint'],
            enrollmentEndpoint: details['enrollment_endpoint'],
            transactionEndpoint: details['authntrxn_endpoint'],
            tokenEndpoint: details['token_endpoint'],
            serviceName: details['metadata']['service_name'],
            methodsSupported: details['discovery_mechanisms'].map((mech) =>
                mech.split(':').pop()
            )
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getToken({ endpoint, data, ignoreSSL }) {
    try {
        const result = await api.getToken({ endpoint, data, ignoreSSL });
        if (result.respInfo.status !== 200) {
            console.warn(result.json());
            return Promise.resolve();
        }
        const token = await result.json();
        const { cipherText: encryptedToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.token,
            payload: token['access_token']
        });
        const { cipherText: encryptedRefreshToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.token,
            payload: token['refresh_token']
        });

        return Promise.resolve({
            accessToken: encryptedToken,
            unsafeToken: token['access_token'],
            refreshToken: encryptedRefreshToken,
            expiry: utils.getTokenExpiryInSeconds(token['expires_in']),
            endpoint,
            authenticatorId: token['authenticator_id'],
            accountName: token['display_name']
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getData() {
    try {
        const {
            osVersion,
            frontCameraAvailable,
            name,
            rooted
        } = await utilities.getDeviceInfo();
        const { pushToken } = await push.getFirebaseToken();
        const { id: deviceId } = await getDeviceId();
        const {
            available: fingerprintSupport
        } = await biometrics.isSensorAvailable();
        return Promise.resolve({
            OSVersion: osVersion,
            frontCamera: frontCameraAvailable,
            deviceName: name,
            deviceRooted: rooted,
            pushToken,
            deviceId,
            fingerprintSupport,
            deviceType: Platform.OS === 'android' ? 'Android' : 'iOS'
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

function getExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

export default initiate;
