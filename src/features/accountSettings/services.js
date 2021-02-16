import {
    removeAccount as removeAccountLocal,
    getAuthIdByAccount,
    getTokenByAccount,
    getEnrollmentEndpoint
} from './queries';
import { removeSamAccount as removeAccountSAM, unregisterTotp } from './api';
async function removeAccount(accId) {
    try {
        const authId = await getAuthIdByAccount(accId);
        const token = await getTokenByAccount(accId);
        const endpoint = await getEnrollmentEndpoint(accId);
        const result = await removeAccountSAM(endpoint, authId, token);
        if (result.respInfo.status === 200) {
            const unregisterTotpResult = await unregisterTotp(endpoint, token);
            if (unregisterTotpResult.respInfo.status === 200) {
                await removeAccountLocal(accId);
                return Promise.resolve({ accountRemoved: true });
            }
        }
        return Promise.resolve({ accountRemoved: false });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { removeAccount };
export { removeAccount };
