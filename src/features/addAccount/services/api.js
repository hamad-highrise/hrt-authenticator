import { utils, errors } from '../../../global';
import { CertsError } from '../../../global/errors';

const { getFetchInstance } = utils;
const { NetworkError } = errors;

async function getDetails({ endpoint, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const headers = {
        Accept: 'application/json'
    };
    try {
        const result = await rnFetch('GET', endpoint, headers);
        return result;
    } catch (error) {
        const errCode = error?.message?.split(':')[0];
        throw errCode === 'java.security.cert.CertPathValidatorException'
            ? new CertsError({ message: 'DETAILS_FETCH' })
            : new NetworkError({ message: 'DETAILS_FETCH' });
    }
}

async function getToken({ endpoint, formEncodedData, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    try {
        const result = await rnFetch(
            'POST',
            endpoint,
            headers,
            formEncodedData
        );
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'TOKEN_FETCH' });
    }
}

async function registerTotp({ endpoint, token, ignoreSsl }) {
    try {
        const rnFetch = getFetchInstance({ ignoreSsl });
        const result = await rnFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        return result;
    } catch (error) {
        throw new NetworkError({
            displayMessage: 'REGISTER_TOTP'
        });
    }
}

async function registerUserPresence({
    endpoint,
    token,
    ignoreSsl,
    requestBody
}) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods`;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    try {
        return await rnFetch('PATCH', url, headers, requestBody);
    } catch (error) {
        throw new NetworkError({
            displayMessage: 'REGISTER_USER_PRESENCE'
        });
    }
}

async function registerBiometrics({ endpoint, token, ignoreSsl, requestBody }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods`;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    try {
        return await rnFetch('PATCH', url, headers, requestBody);
    } catch (error) {
        throw new NetworkError({ message: 'REGISTER_BIOMETRICS' });
    }
}

export default {
    getDetails,
    getToken,
    registerBiometrics,
    registerTotp,
    registerUserPresence
};
export {
    getDetails,
    getToken,
    registerBiometrics,
    registerTotp,
    registerUserPresence
};
