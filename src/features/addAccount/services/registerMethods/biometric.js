import { utilities, biometrics } from '../../../../native-services';
import { constants, utils } from '../../../../global';

import api from '../api';

const { addMethod } = utils;
const METHOD_ALGORITHM = 'SHA256withRSA';

async function rBiometrics({ endpoint, token, accId, ignoreSsl }) {
    try {
        const { uuid } = await utilities.getUUID();
        const keyHandle = uuid + '.' + constants.ACCOUNT_METHODS.FINGERPRINT;
        const { success } = await biometrics.showBiometricPrompt({
            promptMessage: 'Please verify your fingerprint',
            cancelButtonText: 'Cancel'
        });
        if (success) {
            const { publicKey } = await biometrics.createBiomerticKey(
                keyHandle
            );
            const body = JSON.stringify({
                schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
                Operations: [
                    {
                        op: 'add',
                        path:
                            'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods',
                        value: [
                            {
                                keyHandle,
                                algorithm: METHOD_ALGORITHM,
                                publicKey,
                                enabled: true
                            }
                        ]
                    }
                ]
            });
            const result = await api.registerBiometrics({
                endpoint,
                token,
                ignoreSsl,
                requestBody: body
            });
            const { status } = result.respInfo;
            if ((status >= 200 && status < 300) || status === 304) {
                await addMethod({
                    accId,
                    method: constants.ACCOUNT_METHODS.FINGERPRINT,
                    keyHandle
                });
            } else throw new Error('BIOMETRIC_REGISTER');
        } else throw new Error('BIOMTERIC_VERIFICATION');
    } catch (error) {
        throw error;
    }
}

export default rBiometrics;
