import getInsecureFetch from './insecureFetch';
import convertToFormEncoded from './formData';

async function getDetails(url, headers = { Accept: 'application/json' }) {
    try {
        const insecureFetch = getInsecureFetch();
        const result = await insecureFetch('GET', url, headers);
        return Promise.resolve(await result.json());
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getToken(
    url,
    data,
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
) {
    try {
        const insecureFetch = getInsecureFetch();
        const rawObject = {
            ['grant_type']: 'authorization_code',
            code: data.code,
            client_id: 'AuthenticatorClient',
            scope: 'mmfaAuthn',
            device_type: data.deviceType || 'SmartPhone',
            front_camera_support: data.frontCamera || false,
            fingerprint_support: data.fingerprintSupport || false,
            os_version: data.OSVersion || 13,
            device_name: data.deviceName || 'Default Device Name',
            device_rooted: data.deviceRooted || false
        };
        const result = await insecureFetch(
            'POST',
            url,
            headers,
            convertToFormEncoded(rawObject)
        );
        return Promise.resolve(await result.json());
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
            Authorization: 'Bearer ' + token
        });
        return Promise.resolve(await result.json());
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerUserPresence(
    endpoint,
    token,
    { keyHandle, publicKey, algorithm = 'SHA256withRSA' }
) {
    try {
        const body = JSON.stringify({
            schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
            Operations: [
                {
                    op: 'add',
                    path:
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods',
                    value: [
                        {
                            keyHandle,
                            algorithm,
                            publicKey,
                            enabled: true
                        }
                    ]
                }
            ]
        });
        const insecureFetch = getInsecureFetch();
        const result = await insecureFetch(
            'PATCH',
            endpoint,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body
        );
        return Promise.resolve(await result.json());
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerFingerPrintMethod(
    endpoint,
    token,
    { keyHandle, publicKey, algorithm = 'SHA256withRSA' }
) {
    try {
        const body = JSON.stringify({
            schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
            Operations: [
                {
                    op: 'add',
                    path:
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods',
                    value: [
                        {
                            keyHandle,
                            algorithm,
                            publicKey,
                            enabled: true
                        }
                    ]
                }
            ]
        });
        const insecureFetch = getInsecureFetch();
        const result = await insecureFetch(
            'PATCH',
            endpoint,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body
        );
        return Promise.resolve(await result.json());
    } catch (error) {
        return Promise.reject(error);
    }
}
export default {
    getDetails,
    getToken,
    registerTotp,
    registerFingerPrintMethod,
    registerUserPresence
};
