import { getFetchInstance } from './RNFetch';
import { encodeFormData } from './formData';
import utilities from '../../native-services/utilities';
import { Platform } from 'react-native';

async function getPendingTransactions({ endpoint, token, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    try {
        const result = await rnFetch('GET', endpoint, headers);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function removeDeviceFromSam({ endpoint, authId, token, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });
    const url =
        endpoint +
        '?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators';
    const path =
        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators[id eq ' +
        authId +
        ']';
    const body = JSON.stringify({
        schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
        Operations: [
            {
                op: 'remove',
                path
            }
        ]
    });

    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    };

    try {
        const result = await rnFetch('PATCH', url, headers, body);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function unregisterTotp({ endpoint, token, ignoreSSL }) {
    const body = JSON.stringify({
        schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
        Operations: [
            {
                op: 'remove',
                path:
                    'urn:ietf:params:scim:schemas:extension:isam:1.0:OTP:totpEnrolled'
            }
        ]
    });
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    const rnFetch = getFetchInstance({ ignoreSSL });
    try {
        const result = await rnFetch('PATCH', endpoint, headers, body);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getRefreshedToken({ endpoint, refreshToken, ignoreSSL }) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const rnFetch = getFetchInstance({ ignoreSSL });
    try {
        const info = await utilities.getDeviceInfo();
        const body = {
            client_id: 'AuthenticatorClient',
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            scope: 'mmfaAuthn',
            application_id: 'hrt.verify',
            device_rooted: info.rooted,
            device_type: Platform.OS === 'android' ? 'Android' : 'iOS',
            device_name: info.name,
            platform_type: Platform.OS,
            fingerprint_support: false,
            front_camera_support: info.frontCameraAvailable,
            os_version: info.osVersion,
            face_support: false
        };

        const result = await rnFetch(
            'POST',
            endpoint,
            headers,
            encodeFormData(body)
        );
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    removeDeviceFromSam,
    unregisterTotp,
    getRefreshedToken,
    getPendingTransactions
};
export {
    removeDeviceFromSam,
    unregisterTotp,
    getRefreshedToken,
    getPendingTransactions
};
