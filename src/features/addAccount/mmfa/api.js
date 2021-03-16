import { getFetchInstance, encodeFormData } from '../../services';

async function getDetails({ endpoint, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });
    const headers = {
        Accept: 'application/json'
    };
    try {
        const result = await rnFetch('GET', endpoint, headers);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getToken({ endpoint, data, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });
    const body = {
        grant_type: 'authorization_code',
        code: data?.code,
        client_id: 'AuthenticatorClient',
        scope: 'mmfaAuth',
        device_type: data?.deviceType,
        front_camera_support: data?.frontCamera,
        os_version: data?.OSVersion,
        device_name: data?.deviceName,
        device_rooted: data?.deviceRooted,
        application_id: 'com.verify',
        platform_type: data?.deviceType,
        push_token: data?.pushToken
    };
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
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

export default { getDetails, getToken };
export { getDetails, getToken };
