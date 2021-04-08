import { SAMError } from '../../errors';
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
    } catch (error) {
        throw new SAMError({ message: error.message });
    }
}

export default { getRefreshedToken };
export { getRefreshedToken };
