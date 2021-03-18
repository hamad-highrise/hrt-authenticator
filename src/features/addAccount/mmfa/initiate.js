import { Platform } from 'react-native';
import { registerTotp, registerUserPresence } from './registerMethods';
import { getDetails, getToken } from './api';
import { push, biometrics, utilities } from '../../../native-services';
import { createAccount, isUnique, addMethod } from '../services'; //folder related services
import parser from '../qr/parser';
import { getDeviceId } from '../../services';

async function initiate(scanned) {
    const resultObj = {
        message: 'OKAY',
        enrollmentEndpoint: '',
        token: '',
        accountName: '',
        insertId: 0
    };
    const isValidMmfaObj =
        scanned?.code && scanned?.details_url && scanned?.options;
    if (!isValidMmfaObj) {
        resultObj.message = 'INVALID_MMFA_OBJECT';
        return resultObj;
    }
    try {
        //ignore ssl option
        const detailsResult = await getDetails({
            endpoint: scanned['details_url']
        });

        if (detailsResult.respInfo.status !== 200) {
            resultObj.message === 'ERROR_FETCHING_DETAILS';
            return resultObj;
        }

        const {
            tokenEndpoint,
            totpEndpoint,
            enrollmentEndpoint,
            transactionEndpoint,
            methodsSupported,
            serviceName
        } = parseDetails(detailsResult.json());

        //device information
        const {
            osVersion,
            frontCameraAvailable,
            name,
            rooted
        } = await utilities.getDeviceInfo();
        const { pushToken } = await push.getFirebaseToken();

        const data = {
            code: scanned.code,
            OSVersion: osVersion,
            frontCamera: frontCameraAvailable,
            fingerprintSupport: await (await biometrics.isSensorAvailable())
                .available,
            deviceType: Platform.OS === 'android' ? 'Android' : 'iOS',
            deviceName: name,
            deviceRooted: rooted,
            pushToken: pushToken,
            deviceId: await (await getDeviceId()).id
        };

        //ignore ssl option should be here
        const tokenResult = await getToken({
            endpoint: tokenEndpoint,
            data
        });

        if (!tokenResult.respInfo.status === 200) {
            resultObj.message === 'ERROR_FETCHING_TOKEN';
            return resultObj;
        }

        const tokenObj = await tokenResult.json();

        const totpResult = await registerTotp({
            endpoint: totpEndpoint,
            token: tokenObj['access_token']
        });
        if (!totpResult.respInfo.status === 200) {
            resultObj.message == 'ERROR_REGISTERING_TOTP';
            return resultObj;
        }

        const parsedData = parser.uriParser(totpResult.json()['secretKeyUrl']);
        const account = {
            name: parsedData.label.account,
            issuer: serviceName,
            secret: parsedData.query.secret,
            type: 'SAM',
            transactionEndpoint,
            enrollmentEndpoint,
            authId: tokenObj['authenticator_id']
        };
        const token = {
            token: tokenObj['access_token'],
            refreshToken: tokenObj['refresh_token'],
            expiry: getExpiryInSeconds(tokenObj['expires_in']),
            tokenEndpoint
        };

        if (await isUnique(account)) {
            const insertId = await createAccount({ account, token });
            resultObj.insertId = insertId;
        } else {
            resultObj.message = 'DUPLICATE_ACCOUNT';
            //here start remove account flow
        }

        const presenceResult = await registerUserPresence({
            endpoint: enrollmentEndpoint,
            token: token.token,
            name: account.name,
            issuer: account.issuer,
            accId: resultObj.insertId
        });
        if (!presenceResult.respInfo.status === 200) {
            resultObj.message = 'ERROR_REGISTERING_USER_PRESENCE';
            return resultObj;
        }

        resultObj.enrollmentEndpoint = account.enrollmentEndpoint;
        resultObj.token = token.token;
        resultObj.accountName = account.name;
        resultObj.issuer = account.issuer;

        return Promise.resolve(resultObj);
    } catch (error) {
        return Promise.reject(error);
    }
}

function parseToken(tokenResponse) {
    const {
        access_token: accessToken,
        refresh_token: refreshToken,
        authenticator_id: authenticatorId,
        expires_in
    } = tokenResponse;
    return {
        accessToken,
        refreshToken,
        expiry: getExpiryInSeconds(expires_in),
        authenticatorId
    };
}

function parseDetails(detailsResponse) {
    const {
        totp_shared_secret_endpoint: totpEndpoint,
        enrollment_endpoint: enrollmentEndpoint,
        authntrxn_endpoint: transactionEndpoint,
        token_endpoint: tokenEndpoint,
        metadata: { service_name: serviceName },
        discovery_mechanisms
    } = detailsResponse;

    //will translate discovery mechanisims
    const methodsSupported = discovery_mechanisms.map((mech) => {
        const splitted = mech.split(':');
        return splitted[splitted.length - 1];
    });

    return {
        transactionEndpoint,
        enrollmentEndpoint,
        tokenEndpoint,
        totpEndpoint,
        serviceName,
        methodsSupported
    };
}

function getExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

export default initiate;
