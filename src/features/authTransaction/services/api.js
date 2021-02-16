import getInsecureFetch from '../../addAccount/RNFetch';

async function getTransactionData(endpoint, token) {
    const insecureFetch = getInsecureFetch();
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
            return Promise.reject(new Error('NOT_200'));
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

async function authenticateTransaction(endpoint, token, state, signedPayload) {
    const insecureFetch = getInsecureFetch();
    const body = JSON.stringify({ signedChallenge: signedPayload });
    const endUrl = endpoint + '?StateId=' + state;
    try {
        const authResult = await insecureFetch(
            'PUT',
            endUrl,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body
        );
        console.warn(authResult);
        if (authResult.respInfo.status === 204) {
            return Promise.resolve({ message: 'AUTHENTICATED' });
        } else {
            return Promise.reject(new Error('NOT_AUTHENTICATED'));
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { authenticateTransaction, getTransactionData };
export { authenticateTransaction, getTransactionData };
