import {
    getTokenByAccount,
    getTransactionEndpoint,
    updateToken as saveUpdatedToken
} from './queries';
import {
    getPendingTransactions,
    refreshToken as requestUpdatedToken
} from './api';

async function requestTransactions(accId) {
    try {
        const endpoint = await getTransactionEndpoint(accId);
        const { token } = await getTokenByAccount(accId);
        const result = await getPendingTransactions(endpoint, token);
        return Promise.resolve(
            result.respInfo.status === 200 ? await result.json() : null
        );
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getTransactions(accId) {
    try {
        const result = await requestTransactions(accId);
        if (result) {
            if (result?.operation === 'login') {
                const { message } = await updateToken(accId);

                if (message === 'SUCCESS') {
                    const processedTransaction = processTransaction(
                        result[
                            'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
                        ]
                    );
                    return Promise.resolve({
                        transaction: processedTransaction,
                        success: true,
                        message
                    });
                } else {
                    return Promise.resolve({ success: false, message });
                }
            } else {
                const processedTransaction = processTransaction(
                    result[
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
                    ]
                );
                return Promise.resolve({
                    transaction: processedTransaction,
                    success: true,
                    message: 'SUCCESS'
                });
            }
        } else {
            return Promise.resolve({
                success: false,
                message: 'UNKNOWN_ERROR'
            });
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

async function updateToken(accId) {
    try {
        const {
            refresh_token: refreshToken,
            endpoint
        } = await getTokenByAccount(accId);

        const result = await requestUpdatedToken(endpoint, refreshToken);
        //400 status will be returned if device has been deleted
        if (result.respInfo.status === 200) {
            const { access_token, refresh_token, expires_in } = result.json();
            saveUpdatedToken(
                {
                    token: access_token,
                    refreshToken: refresh_token,
                    expiry: expires_in
                },
                accId
            );
            return Promise.resolve({ message: 'SUCCESS' });
        } else if (result.respInfo.status === 400) {
            //device has been removed
            return Promise.resolve({ message: 'SERVER_NO_DEVICE' });
        } else return Promise.resolve({ success: false });
    } catch (error) {
        return Promise.reject(error);
    }
}

function processTransaction({ attributesPending, transactionsPending }) {
    if (attributesPending.length && transactionsPending.length) {
        const {
            values: [displayMessage]
        } = attributesPending.find(
            (attribute) => attribute['name'] === 'mmfa.request.context.message'
        );
        const [transaction] = transactionsPending;
        const {
            requestUrl,
            creationTime: createdAt,
            transactionId,
            authnPolicyURI
        } = transaction;

        return {
            id: transactionId,
            displayMessage: displayMessage,
            requestUrl: requestUrl,
            createdAt,
            method: translateMethod(authnPolicyURI)
        };
    } else return null;
}

function translateMethod(policyURI) {
    const arr = policyURI.split(':');
    return arr.includes('mmfa_fingerprint_response')
        ? 'fingerprit'
        : 'userPresence';
}

export default { getTransactions };

// async function getTransactions(accId) {
//     try {
//         const endpoint = await getTransactionEndpoint(accId);
//         const { token } = await getTokenByAccount(accId);
//         const transactionsResult = await getPendingTransactions(
//             endpoint,
//             token
//         );
//         if (transactionsResult.respInfo.status === 200) {
//             const parsed = await transactionsResult.json();
//             console.warn(parsed);
//             //get difference if token is expired or device has been removed
//             if (parsed['operation'] && parsed['operation'] === 'login') {
//                 saveUpdatedToken(accId);
//             }

//             const { attributesPending, transactionsPending } = parsed[
//                 'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
//             ];

//             if (
//                 attributesPending.length > 0 &&
//                 transactionsPending.length > 0
//             ) {
//                 const messageObj = attributesPending.find(
//                     (attribute) =>
//                         attribute['name'] === 'mmfa.request.context.message'
//                 );
//                 const [transaction] = transactionsPending;
//                 const {
//                     requestUrl,
//                     creationTime: createdAt,
//                     transactionId,
//                     authnPolicyURI
//                 } = transaction;

//                 return Promise.resolve({
//                     id: transactionId,
//                     displayMessage: messageObj.values[0],
//                     requestUrl: requestUrl,
//                     createdAt,
//                     method: translateMethod(authnPolicyURI)
//                 });
//             } else return Promise.resolve();
//         }
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }
