import Config from 'react-native-config';
import {  FetchBlobResponse } from 'rn-fetch-blob';
import { utils, errors } from '../../../global';
import { CertsError } from '../../../global/errors';

const { getFetchInstance } = utils;
const { NetworkError } = errors;

/**
 * @module API
 * @author Hamad Safdar <hamad@highrisetechnologies.com>
 */

/**
 * @async
 * @param {{endpoint:string, ignoreSsl:boolean}} options
 * @returns {Promise<FetchBlobResponse>} -
 */

async function getDetails({ endpoint, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const headers = {
        Accept: 'application/json',
        'user-agent': Config.APPLICATION_ID
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

/**
 * @typedef TokenRequestOptions
 * @property {string} endpoint - URL to send request
 * @property {string} formEncodedData - Token request body encoded to form data
 * @property {boolean} ignoreSsl - Boolean to indicate to ignore SSL or not
 */

/**
 *  Get Token for the first time.
 * @async
 * @param {TokenRequestOptions} tokenRequestOptions
 * @returns {Promise<FetchBlobResponse>}
 * @throws {NetworkError}
 */

async function getToken({ endpoint, formEncodedData, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-agent': Config.APPLICATION_ID
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

/**
 * @typedef RegisterTOTPConfig
 * @property {string} endpoint - Endpoint to request for TOTP
 * @property {string} token - Access Token
 * @property {boolean} ignoreSsl
 */

/**
 * @async
 * @param {RegisterTOTPConfig} totpResgistrationConfig
 * @returns {Promise<FetchBlobResponse>}
 */

async function registerTotp({ endpoint, token, ignoreSsl }) {
    try {
        const rnFetch = getFetchInstance({ ignoreSsl });
        const result = await rnFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'user-agent': Config.APPLICATION_ID
        });
        return result;
    } catch (error) {
        throw new NetworkError({
            displayMessage: 'REGISTER_TOTP'
        });
    }
}

/**
 * @typedef AuthenticationMethodRegistrationConfig
 * @property {string} endpoint - URL to request for registration
 * @property {string} token - Access Token
 * @property {boolean} ignoreSsl
 * @property {string} requestBody - Stringified JSON
 */

/**
 * @async
 * @param {AuthenticationMethodRegistrationConfig} userPresenceRegistrationConfig
 * @returns {Promise<FetchBlobResponse>}
 */

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
        Authorization: 'Bearer ' + token,
        'user-agent': Config.APPLICATION_ID
    };
    try {
        return await rnFetch('PATCH', url, headers, requestBody);
    } catch (error) {
        throw new NetworkError({
            displayMessage: 'REGISTER_USER_PRESENCE'
        });
    }
}

/**
 * @async
 * @param {AuthenticationMethodRegistrationConfig} biometricsRegistrationConfig
 * @returns {Promise<FetchBlobResponse>}
 */

async function registerBiometrics({ endpoint, token, ignoreSsl, requestBody }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods`;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'user-agent': Config.APPLICATION_ID
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
