import api from './api';
import { biometrics, keyGen } from '../../../native-services';

import { services, errors } from '../../../global';

const { TokenError, SAMError } = errors;
const { getAccessToken } = services;

async function getTransactionData({ endpoint, token, ignoreSsl }) {
    try {
        const result = await api.getTransactionData({
            endpoint,
            token,
            ignoreSsl
        });
        const { status } = result.respInfo;
        if ((status >= 200 && status < 300) || status === 304) {
            const {
                state,
                type,
                keyHandles: [keyHandle],
                serverChallenge
            } = await result.json();
            return {
                state,
                type,
                keyHandle,
                challenge: serverChallenge,
                requestUrl: endpoint.split('?')[0]
            };
        } else {
            if (status >= 500) throw new SAMError({});
            if (status >= 400 && status < 500)
                throw new TokenError({ message: 'TRANSACTION_RETRIEVE_ERROR' });
        }
    } catch (error) {
        throw error;
    }
}

async function approveTransaction({ accId, endpoint, ignoreSsl }) {
    try {
        const accessToken = await getAccessToken(accId);
        const {
            type,
            state: stateId,
            keyHandle,
            requestUrl,
            challenge
        } = await getTransactionData({
            endpoint,
            token: accessToken,
            ignoreSsl
        });
        const types = ['fingerprint', 'user_presence'];
        let result;
        if (types.includes(type)) {
            console.warn(type);
            //if transaction is of fingerprint
            if (type === 'fingerprint')
                result = await biometrics.signPayload({
                    keyHandle,
                    payload: challenge
                });
            //if transaction is of user presence
            if (type === 'user_presence')
                result = await keyGen.signPayload({
                    keyHandle,
                    payload: challenge
                });
        } else throw new Error('UNKNOWN_TRANSACTION_TYPE');
        const auth = await api.respondTransaction({
            endpoint: requestUrl,
            token: accessToken,
            stateId,
            signedPayload: result?.signature
        });
        const { status } = auth.respInfo;

        if (status === 204) {
            return;
        } else {
            if (status >= 400 && status < 500)
                throw new TokenError({
                    message: 'APPROVING_TRANSACTION_ERROR'
                });

            if (status >= 500) throw new SAMError({});
        }
    } catch (error) {
        throw error;
    }
}
async function denyTransaction({ accId, endpoint, ignoreSsl }) {
    try {
        const accessToken = await getAccessToken(accId);
        const { state: stateId, requestUrl } = await getTransactionData({
            endpoint,
            token: accessToken,
            ignoreSsl
        });

        await api.respondTransaction({
            endpoint: requestUrl,
            token: accessToken,
            stateId,
            signedPayload: 'workaround-till-now-for-deny'
        });

        return;
    } catch (error) {
        throw error;
    }
}

export default { approveTransaction, denyTransaction };
export { approveTransaction, denyTransaction };
