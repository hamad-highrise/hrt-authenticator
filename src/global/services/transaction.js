import { getAccessToken } from './token';
import { getTransactionEndpoint, getMethods, removeAccountFromDB } from './db';
import { getPendingTransactions } from './api';
import { SAMError, TokenError } from '../errors';
import { getAuthIdByAccount } from '../util';
import { checkAuthenticatorValiditiy } from './authenticator';
import constants from '../constants';

async function getTransactions({ accId, ignoreSsl }) {
    let transaction;
    try {
        const accessToken = await getAccessToken(accId);
        //getting registered authenticators
        const isAuthenticatorValid = await checkAuthenticatorValiditiy({
            accId,
            ignoreSsl
        });
        if (isAuthenticatorValid) {
            const transactionEndpoint = await getTransactionEndpoint(accId);
            const transactionResponse = await getPendingTransactions({
                endpoint: transactionEndpoint,
                token: accessToken,
                ignoreSsl
            });

            const status = transactionResponse.respInfo.status;
            if ((status >= 200 && status < 300) || status === 304) {
                transaction = processTransaction(
                    transactionResponse.json()?.[
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
                    ]
                );
            } else {
                throw transactionResponse.json().operation === 'login'
                    ? new TokenError({ message: 'DEVICE_REMOVED_MANUALLY' })
                    : new SAMError({
                          message: transactionResponse.json().error_description
                      });
            }
            try {
                return (await isTransactionValid(transaction, accId))
                    ? transaction
                    : null;
            } catch (error) {
                throw error;
            }
        } else {
            try {
                await removeAccountFromDB(accId);
            } catch (error) {
                throw error;
            }
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

async function isTransactionValid(transaction, accId) {
    if (!transaction) return;
    const {
        method: transactionMethod,
        authenticatorId: transactionAuthId
    } = transaction;
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

async function existsOrRemoved() {}
