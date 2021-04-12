import { NetworkError, SAMError } from '../../errors';
import { getFetchInstance } from '../../util';

async function getRefreshedToken({ endpoint, formEncodedBody, ignoreSsl }) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const rnFetch = getFetchInstance({ ignoreSsl });
    try {
        const result = await rnFetch(
            'POST',
            endpoint,
            headers,
            formEncodedBody
        );
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

export default { getRefreshedToken };
export { getRefreshedToken };
