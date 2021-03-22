import constants from './constants';

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
            transactionId,
            displayMessage: displayMessage,
            requestUrl: requestUrl,
            createdAt,
            method: translateMethod(authnPolicyURI)
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

export default { processTransaction };
export { processTransaction };
