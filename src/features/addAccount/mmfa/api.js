import { NetworkError, SAMError } from '../../../global/errors';
import { getFetchInstance, encodeFormData, constants } from '../../services';

async function getDetails({ endpoint, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });
    const headers = {
        Accept: 'application/json'
    };
    try {
        const result = await rnFetch('GET', endpoint, headers);
        return Promise.resolve(result);
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

async function getToken({ endpoint, formEncodedData, ignoreSSL }) {
    const rnFetch = getFetchInstance({ ignoreSSL });

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
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

export default { getDetails, getToken };
export { getDetails, getToken };
