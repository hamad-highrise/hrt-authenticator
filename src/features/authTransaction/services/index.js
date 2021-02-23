import { getTransactionData, authenticateTransaction } from './api';
import { getTokenByAccount } from './queries';
import biometrics from '../../../util/biometrics';
import keyGen from '../../../util/KeyGen';

async function authTransaction(accId, tEndpoint) {
    let result;
    try {
        const { token } = await getTokenByAccount(accId);
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
        return Promise.resolve();
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

export default { authTransaction };
export { authTransaction };
