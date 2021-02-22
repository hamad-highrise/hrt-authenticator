import getInsecureFetch from '../RNFetch';
import { NativeModules, Platform } from 'react-native';
import {
    registerTotp,
    registerUserPresence,
    registerBiometrics
} from './registerMethods';
import convertToFormEncoded from './formData';
import { addAccount, isUnique } from './queries';
import parser from '../qr/parser';

async function initiate(scanned) {
    const { Utilities, BiometricAndroid } = NativeModules;

    const resultObj = { message: 'OKAY' };
    const isValidMmfaObj =
        scanned?.code && scanned?.details_url && scanned?.options;
    if (!isValidMmfaObj) {
        resultObj.message = 'INVALID_MMFA_OBJECT';
        return resultObj;
    }
    try {
        const detailsResult = await getDetails(scanned.details_url);
        console.warn(detailsResult.json());
        if (!detailsResult.respInfo.status === 200) {
            resultObj.message === 'ERROR_FETCHING_DETAILS';
            return resultObj;
        }
        const deviceInfo = await Utilities.getDeviceInfo();
        //device information
        const data = {
            code: scanned.code,
            OSVersion: deviceInfo.osVersion,
            frontCamera: deviceInfo.frontCamera,
            fingerprintSupport: await BiometricAndroid.isSensorAvailable()
                .available,
            deviceType: Platform.OS === 'android' ? 'Android' : 'iOS',
            deviceName: deviceInfo.model
        };
        const details = detailsResult.json();
        const tokenResult = await getToken(details.token_endpoint, data);
        if (!tokenResult.respInfo.status === 200) {
            resultObj.message === 'ERROR_FETCHING_TOKEN';
            return resultObj;
        }
        const tokenObj = await tokenResult.json();
        const totpResult = await registerTotp(
            details['totp_shared_secret_endpoint'],
            tokenObj['access_token']
        );
        if (!totpResult.respInfo.status === 200) {
            resultObj.message == 'ERROR_REGISTERING_TOTP';
            return resultObj;
        }
        const parsedData = parser.uriParser(totpResult.json()['secretKeyUrl']);
        const account = {
            name: parsedData.label.account,
            issuer: details.metadata.service_name,
            secret: parsedData.query.secret,
            type: 'SAM',
            transactionEndpoint: detailsResult.json()['authntrxn_endpoint'],
            enrollmentEndpoint: detailsResult.json()['enrollment_endpoint'],
            authId: tokenObj['authenticator_id']
        };
        const token = {
            token: tokenObj['access_token'],
            refreshToken: tokenObj['refresh_token'],
            expiry: tokenObj['expires_in'],
            tokenEndpoint: detailsResult.json()['token_endpoint']
        };
        const presenceResult = await registerUserPresence(
            account.enrollmentEndpoint,
            token.token
        );
        console.warn(presenceResult.data);
        const biometricResult = await registerBiometrics(
            account.enrollmentEndpoint,
            token.token
        );
        if (biometricResult) {
            if (!biometricResult.respInfo.status === 200) {
                resultObj.message = 'ERROR_REGISTERING_BIOMETRIC';
                return resultObj;
            }
            console.warn(biometricResult.data);
        } else alert('INVALID_BIOMETRIC');

        if (!presenceResult.respInfo.status === 200) {
            resultObj.message = 'ERROR_REGISTERING_USER_PRESENCE';
            return resultObj;
        }
        if (await isUnique(account)) {
            addAccount(account, token);
        } else {
            resultObj.message = 'DUPLICATE_ACCOUNT';
            //here start remove account flow
        }
        return Promise.resolve(resultObj);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getDetails(endpoint) {
    const insecureFetch = getInsecureFetch();
    try {
        const result = await insecureFetch('GET', endpoint, {
            Accept: 'application/json'
        });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getToken(endpoint, data) {
    try {
        const insecureFetch = getInsecureFetch();
        const rawObject = {
            grant_type: 'authorization_code',
            code: data.code,
            client_id: 'AuthenticatorClient',
            scope: 'mmfaAuth',
            device_type: data.deviceType || 'SmartPhone',
            front_camera_support: data.frontCamera || false,
            os_version: data.OSVersion || 13,
            device_name: data.deviceName || 'Default Device Name',
            device_rooted: data.deviceRooted || false
        };
        const result = await insecureFetch(
            'POST',
            endpoint,
            {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            convertToFormEncoded(rawObject)
        );
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default initiate;
