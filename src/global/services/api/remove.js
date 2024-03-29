import Config from 'react-native-config';
import { NetworkError } from '../../errors';
import { getFetchInstance } from '../../util';

/**
 * Removes device from SAM and unresgiters User Presence and Fingerprint methods.
 * @param {{endpoint: String, authId: String, token: String, ignoreSsl: Boolean}} obj - Request data
 * @returns resolves in to FetchBlobResponse
 * @throws Error
 */

async function removeDeviceFromSam({
    endpoint,
    authId,
    token,
    ignoreSsl = false
}) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const requestUrl =
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
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'user-agent': Config.APPLICATION_ID
    };

    try {
        const result = await rnFetch('PATCH', requestUrl, headers, body);
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

async function unregisterTotp({ endpoint, token, ignoreSsl = false }) {
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
        Authorization: 'Bearer ' + token,
        'user-agent': Config.APPLICATION_ID
    };
    const rnFetch = getFetchInstance({ ignoreSsl });
    try {
        const result = await rnFetch('PATCH', endpoint, headers, body);
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

export default { removeDeviceFromSam, unregisterTotp };
export { removeDeviceFromSam, unregisterTotp };
