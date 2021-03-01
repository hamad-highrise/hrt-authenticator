import { getFetchInstance } from './RNFetch';
import { encodeFormData } from './formData';

async function getPendingTransactions({ endpoint, token, secure }) {
    const rnFetch = getFetchInstance({ secure });
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

async function removeDeviceFromSam({ endpoint, authId, token, secure }) {
    const rnFetch = getFetchInstance({ secure });
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

async function unregisterTotp({ endpoint, token, secure }) {
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
    const rnFetch = getFetchInstance({ secure });
    try {
        const result = await rnFetch('PATCH', endpoint, headers, body);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getRefreshedToken({ endpoint, refreshToken, secure }) {
    const body = {
        client_id: 'AuthenticatorClient',
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'mmfaAythn',
        application_id: 'hrt.verify',
        device_rooted: false,
        device_id: '',
        device_type: '',
        device_name: '',
        platform_type: '',
        fingerprint_support: false,
        front_camera_support: false,
        os_version: 15,
        face_support: false
    };
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const rnFetch = getFetchInstance({ secure });
    try {
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
