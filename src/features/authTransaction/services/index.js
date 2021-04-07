import { getTransactionData, authenticateTransaction } from './api';
import { getToken } from '../../services';
import { biometrics, keyGen } from '../../../native-services';

async function authTransaction({ accId, tEndpoint }) {
    let result;
    try {
        const { token, success, message } = await getToken(accId);
        if (success) {
            const transaction = await getTransactionData(tEndpoint, token);
            if (transaction.message === 'SUCCESS') {
                const {
                    challenge,
                    requestUrl,
                    keyHandle,
                    type,
                    state
                } = transaction;
                if (type === 'fingerprint') {
                    result = await biometrics.signPayload({
                        promptMessage: 'Please Verify for authentication',
                        keyHandle,
                        payload: challenge
                    });
                } else if (type === 'user_presence') {
                    result = await keyGen.signPayload({
                        keyHandle,
                        payload: challenge
                    });
                }
                const { success, signature } = result;
                if (success) {
                    const auth = await authenticateTransaction(
                        requestUrl,
                        token,
                        state,
                        signature
                    );
                    if (auth.message === 'AUTHENTICATED') {
                        return Promise.resolve();
                    } else alert('Error authentication');
                } else alert('Error signing');
            } else {
                alert('Error getting data');
            }
        } else {
            switch (message) {
                case 'DEVICE_REMOVED':
                    alert('Device has been removed from server.');
                    break;
                case 'UNKNOWN_ERROR':
                    alert('An Unknown error occured');
                    break;
                default:
                    alert('Default');
                    break;
            }
        }

        return Promise.resolve();
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

async function rejectTransaction({ accId, tEndpoint }) {
    let result;
    try {
        const { token } = await getToken(accId);
        const transaction = await getTransactionData(tEndpoint, token);
        if (transaction.message === 'SUCCESS') {
            const { challenge, requestUrl, state } = transaction;

            const auth = await authenticateTransaction(
                requestUrl,
                token,
                state,
                'transaction-reject-workaround-till-next-time'
            );
            if (auth.message === 'NOT_AUTHENTICATED') {
                return Promise.resolve();
            } else alert('Error REJECTING');
        } else {
            alert('Error getting data');
        }
        return Promise.resolve();
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

export default { authTransaction, rejectTransaction };
export { authTransaction, rejectTransaction };
