import { utils, errors } from '../../../global';

const { getFetchInstance } = utils;
const { NetworkError } = errors;

async function getTransactionDataX({ endpoint, token, ignoreSsl }) {
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

async function getTransactionData({ endpoint, token, ignoreSsl }) {
    const insecureFetch = getFetchInstance({ ignoreSsl });
    try {
        const data = await insecureFetch('POST', endpoint, {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        if (data.respInfo.status === 200) {
            const {
                state,
                type,
                keyHandles: [keyHandle],
                serverChallenge
            } = await data.json();
            return Promise.resolve({
                message: 'SUCCESS',
                state,
                type,
                keyHandle,
                challenge: serverChallenge,
                requestUrl: endpoint.split('?')[0]
            });
        } else {
            return Promise.reject(new Error('NOT_200_TRANSACTION_DATA'));
        }
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

export default { getTransactionData, getTransactionDataX, respondTransaction };
export { respondTransaction, getTransactionData, getTransactionDataX };
