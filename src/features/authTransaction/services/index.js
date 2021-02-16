import { getTransactionData, authenticateTransaction } from './api';
import { getTokenByAccount } from './queries';
import { signChallengeWithBiometric } from '../../../util/biometrics';

async function authTransaction(accId, tEndpoint) {
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
            const { success, signature } = await signChallengeWithBiometric({
                promptMessage: 'Please Verify for authentication',
                keyHandle,
                payload: challenge
            });
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
