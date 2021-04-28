import constants from '../constants';
import { SAMError, TokenError } from '../errors';
import { getAuthIdByAccount, getEnrollmentEndpoint } from '../util';
import { unregisterTotp, removeDeviceFromSam } from './api';
import { removeAccountFromDB } from './db';
import { getAccessToken } from './token';

async function removeAccount({ accId, type, ignoreSsl }) {
    try {
        type === constants.ACCOUNT_TYPES.SAM &&
            (await sAMAccountRemove({ accId, ignoreSsl }));
        await removeAccountFromDB(accId);
    } catch (error) {
        throw error;
    }
}

async function sAMAccountRemove({ accId, ignoreSsl }) {
    try {
        const accessToken = await getAccessToken(accId);
        const enrollmentEndpoint = await getEnrollmentEndpoint(accId);
        const totpUnregisterResponse = await unregisterTotp({
            endpoint: enrollmentEndpoint,
            token: accessToken,
            ignoreSsl
        });
        if (totpUnregisterResponse.respInfo.status !== 200) {
            if (totpUnregisterResponse.json.operation === 'login') {
                await removeAccountFromDB(accId);
                throw new TokenError({ message: 'DEVICE_REMOVED_MANUALLY' });
            } else
                throw new SAMError({
                    message: totpUnregisterResponse.json().message
                });
        } else {
            const authId = await getAuthIdByAccount(accId);
            const removeDeviceResponse = await removeDeviceFromSam({
                endpoint: enrollmentEndpoint,
                authId,
                token: accessToken,
                ignoreSsl
            });
            if (removeDeviceResponse.respInfo.status !== 200) {
                throw new SAMError({
                    message: removeDeviceResponse.json().error_description
                });
            }
        }
        return;
    } catch (error) {
        throw error;
    }
}

export default { removeAccount };
export { removeAccount };
