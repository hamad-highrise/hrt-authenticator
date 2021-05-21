import { utils, errors } from '../../../global';

const { getFetchInstance } = utils;
const { NetworkError } = errors;

async function getTransactionData({ endpoint, token, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
    try {
        const data = await rnFetch('POST', endpoint, headers);
        return data;
    } catch (error) {
        throw new NetworkError({ message: 'ERROR_GETTING_TRANSACTION_DATA' });
    }
}

async function respondTransaction({
    endpoint,
    token,
    stateId,
    signedPayload,
    ignoreSsl
}) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const body = JSON.stringify({ signedChallenge: signedPayload });
    const endUrl = endpoint + '?StateId=' + stateId;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    };
    try {
        const result = await rnFetch('PUT', endUrl, headers, body);
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'ERROR_RESPONDIN_TRANSACTION' });
    }
}

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

export default {
    getTransactionData,
    respondTransaction,
    getPendingTransactions
};
export { respondTransaction, getTransactionData, getPendingTransactions };
