//TODO: Check if valid object
import getInsecureFetch from '../RNFetch';
import { NativeModules, Platform } from 'react-native';
import convertToFormEncoded from './formData';
import { saveToken } from './queries';

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
        const tokenResult = await getToken(
            detailsResult.json().token_endpoint,
            data
        );
        if (!tokenResult.respInfo.status === 200) {
            resultObj.message === 'ERROR_FETCHING_TOKEN';
            return resultObj;
        }
        const totpResult = await registerTotp(
            detailsResult.json()['totp_shared_secret_endpoint'],
            tokenResult.json()['access_token']
        );
        if (!totpResult.respInfo.status === 200) {
            resultObj.message == 'ERROR_REGISTERING_TOTP';
        }
        // await saveToken();
        return Promise.resolve(resultObj);
    } catch (error) {
        return Promise.reject(error);
    }
}

function getMethods(mechanisims) {}

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

async function registerTotp(endpoint, token) {
    try {
        const insecureFetch = getInsecureFetch();
        const result = await insecureFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default initiate;
