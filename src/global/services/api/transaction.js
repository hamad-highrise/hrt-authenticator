import { SAMError } from '../../errors';
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
        if (result.respInfo.status === 200) return result;
        else throw new SAMError({ message: result.json() });
    } catch (error) {
        throw error;
    }
}

export default { getPendingTransactions };
export { getPendingTransactions };
