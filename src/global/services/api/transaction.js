import { NetworkError, SAMError } from '../../errors';
import { getFetchInstance } from '../../util';

async function getPendingTransactions({ endpoint, token, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    try {
        const result = await rnFetch('GET', endpoint, headers);
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

export default { getPendingTransactions };
export { getPendingTransactions };
