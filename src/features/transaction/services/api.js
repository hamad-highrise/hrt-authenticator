import { utils, errors } from '../../../global';

const { getFetchInstance } = utils;
const { NetworkError } = errors;

/** @module API */

/**
 * 
 * @param {*} param0 
 * @returns 
 */


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

export default { getTransactionData, respondTransaction };
export { respondTransaction, getTransactionData };
