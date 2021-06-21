import { keyGen, utilities } from '../../../../native-services';
import { constants, utils } from '../../../../global';

import api from '../api';

const METHODS_ALGORITHIM = 'SHA256withRSA';

async function userPresence({ endpoint, token, accId, ignoreSsl }) {
    try {
        const { uuid } = await utilities.getUUID();
        const keyHandle = uuid + '.' + constants.ACCOUNT_METHODS.USER_PRESENCE;
        const { publicKey } = await keyGen.createKeys(keyHandle);
        const body = JSON.stringify({
            schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
            Operations: [
                {
                    op: 'add',
                    path:
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods',
                    value: [
                        {
                            keyHandle,
                            algorithm: METHODS_ALGORITHIM,
                            publicKey,
                            enabled: true
                        }
                    ]
                }
            ]
        });
        const result = await api.registerUserPresence({
            endpoint,
            token,
            ignoreSsl,
            requestBody: body
        });
        const { status } = result.respInfo;
        if ((status >= 200 && status < 300) || status === 304) {
            await utils.addMethod({
                accId,
                method: constants.ACCOUNT_METHODS.USER_PRESENCE,
                keyHandle
            });
        } else {
            throw new Error('USER_PRESENCE_ERROR_C');
        }
    } catch (error) {
        throw error;
    }
}

export default userPresence;
