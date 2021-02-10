import {
    getTokenByAccount,
    getTransactionEndpoint,
    updateToken
} from './queries';
import {
    getPendingTransactions,
    refreshToken as requestUpdatedToken
} from './api';

async function getNewToken(accId) {
    try {
        const {
            refresh_token: refreshToken,
            endpoint
        } = await getTokenByAccount(accId);

        const result = await requestUpdatedToken(endpoint, refreshToken);
        if (result.respInfo.status === 200) {
            const { access_token, refresh_token, expires_in } = result.json();
            updateToken(
                {
                    token: access_token,
                    refreshToken: refresh_token,
                    expiry: expires_in
                },
                accId
            );
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}
async function getTransactions(accId) {
    try {
        const endpoint = await getTransactionEndpoint(accId);
        const { token } = await getTokenByAccount(accId);
        const transactionsResult = await getPendingTransactions(
            endpoint,
            token
        );
        if (transactionsResult.respInfo.status === 200) {
            const parsed = await transactionsResult.json();
            // if (parsed['operation'] && parsed['operation'] === 'login') {
            //     console.warn('getting new');
            //     getNewToken(accId);
            // }
            console.warn(token);
            getNewToken(accId);

            const { attributesPending, transactionsPending } = parsed[
                'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
            ];

            if (
                attributesPending.length > 0 &&
                transactionsPending.length > 0
            ) {
                const messageObj = attributesPending.find(
                    (attribute) =>
                        attribute['name'] === 'mmfa.request.context.message'
                );
                const [transaction] = transactionsPending;
                const {
                    requestUrl,
                    creationTime: createdAt,
                    transactionId,
                    authnPolicyURI
                } = transaction;

                return Promise.resolve({
                    id: transactionId,
                    displayMessage: messageObj.values[0],
                    requestUrl: requestUrl,
                    createdAt,
                    method: translateMethod(authnPolicyURI)
                });
            } else return Promise.resolve();
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

function translateMethod(policyURI) {
    const arr = policyURI.split(':');
    return arr.includes('mmfa_fingerprint_response')
        ? 'fingerprit'
        : 'userPresence';
}

export default { getTransactions };
