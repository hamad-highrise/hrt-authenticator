import getInsecureFetch from '../RNFetch';
import { Platform, NativeModules } from 'react-native';
import { registerTotp, registerUserPresence } from './registerMethods';
import { getDeviceInfo } from '../../../util/utilities';
import biometric from '../../../util/biometrics';
import convertToFormEncoded from './formData';
import { addAccount, isUnique } from './queries';
import parser from '../qr/parser';

async function initiate(scanned) {
    const resultObj = {
        message: 'OKAY',
        enrollmentEndpoint: '',
        token: '',
        accountName: ''
    };
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
        const {
            osVersion,
            frontCameraAvailable,
            name,
            rooted
        } = await getDeviceInfo();
        //device information
        const { pushToken } = await NativeModules.RNPush.getFirebaseToken();
        console.warn('Push Token', pushToken);
        const data = {
            code: scanned.code,
            OSVersion: osVersion,
            frontCamera: frontCameraAvailable,
            fingerprintSupport: await (await biometric.isSensorAvailable())
                .available,
            deviceType: Platform.OS === 'android' ? 'Android' : 'iOS',
            deviceName: name,
            deviceRooted: rooted,
            pushToken: pushToken
        };
        const details = detailsResult.json();
        const tokenResult = await getToken(details.token_endpoint, data);
        console.warn(tokenResult.json());
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
            transactionEndpoint: details['authntrxn_endpoint'],
            enrollmentEndpoint: details['enrollment_endpoint'],
            authId: tokenObj['authenticator_id']
        };
        const token = {
            token: tokenObj['access_token'],
            refreshToken: tokenObj['refresh_token'],
            expiry: getExpiryInSeconds(tokenObj['expires_in']),
            tokenEndpoint: details['token_endpoint']
        };
        const presenceResult = await registerUserPresence(
            account.enrollmentEndpoint,
            token.token
        );

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
        resultObj.enrollmentEndpoint = account.enrollmentEndpoint;
        resultObj.token = token.token;
        resultObj.accountName = account.name;
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
            device_rooted: data.deviceRooted || false,
            application_id: 'com.hrt.verify',
            platform_type: data.deviceType,
            push_token: data.pushToken
        };
        const body = convertToFormEncoded(rawObject);
        console.warn(body);
        const result = await insecureFetch(
            'POST',
            endpoint,
            {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        );
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

function getExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

export default initiate;
