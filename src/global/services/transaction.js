import { getAccessToken } from './token';
import { getTransactionEndpoint, getMethods } from './db';
import { getPendingTransactions } from './api';
import { SAMError, TokenError } from '../errors';
import { getAuthIdByAccount } from '../util';

async function getTransactions({ accId, ignoreSsl }) {
    let transaction;
    try {
        const accessToken = await getAccessToken(accId);
        const transactionEndpoint = await getTransactionEndpoint(accId);
        const transactionResponse = await getPendingTransactions({
            endpoint: transactionEndpoint,
            token: accessToken
        });
        if (transactionResponse.respInfo.status === 200) {
            transaction = processTransaction(
                transactionResponse.json()[
                    'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
                ]
            );
        } else if (transactionResponse.respInfo.status === 400) {
            throw transactionResponse.json().operation === 'login'
                ? new TokenError({ message: 'DEVICE_REMOVED_MANUALLY' })
                : new SAMError({ message: transactionResponse.json() });
        }
        try {
            return (await isTransactionValid(transaction)) ? transaction : null;
        } catch (error) {
            throw error;
        }
    } catch (error) {
        throw error;
    }
}

export default { getTransactions };
export { getTransactions };

function processTransaction({ attributesPending, transactionsPending }) {
    if (attributesPending.length && transactionsPending.length) {
        const {
            values: [displayMessage]
        } = attributesPending.find(
            (attribute) => attribute['name'] === 'mmfa.request.context.message'
        );

        const {
            values: [authenticatorId]
        } = attributesPending.find(
            (attribute) => attribute['name'] === 'mmfa.request.authenticator.id'
        );
        const [transaction] = transactionsPending;

        const {
            requestUrl,
            creationTime: createdAt,
            transactionId,
            authnPolicyURI
        } = transaction;

        return {
            transactionId,
            displayMessage: displayMessage,
            requestUrl: requestUrl,
            createdAt,
            method: translateMethod(authnPolicyURI),
            authenticatorId
        };
    } else return null;
}

function translateMethod(policyURI) {
    const arr = policyURI.split(':');
    if (arr.includes('mmfa_fingerprint_response'))
        return constants.ACCOUNT_METHODS.FINGERPRINT;
    else if (arr.includes('mmfa_user_presence_response'))
        return constants.ACCOUNT_METHODS.USER_PRESENCE;
    else return null;
}

async function isTransactionValid(
    { method: transactionMethod, authenticatorId: transactionAuthId },
    accId
) {
    try {
        const registeredMethods = await getMethods(accId);
        const authenticatorId = await getAuthIdByAccount(accId);
        return (
            registeredMethods.includes(transactionMethod) &&
            transactionAuthId === authenticatorId
        );
    } catch (error) {
        throw error;
    }
}
