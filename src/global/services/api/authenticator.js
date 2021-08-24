import Config from 'react-native-config';
import { NetworkError } from '../../errors';
import { getFetchInstance } from '../../util';

async function getRegisteredAuthenticators({ endpoint, token, ignoreSsl }) {
    const headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'user-agent': Config.APPLICATION_ID
    };
    const rnFetch = getFetchInstance({ ignoreSsl });
    const requestUrl =
        endpoint +
        '?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators';
    try {
        const result = await rnFetch('GET', requestUrl, headers);
        return result;
    } catch (error) {
        throw new NetworkError({
            message: 'ERROR_GETTING_REGISTERED_AUTHENTICATORS'
        });
    }
}

export default { getRegisteredAuthenticators };
export { getRegisteredAuthenticators };
