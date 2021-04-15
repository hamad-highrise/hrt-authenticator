import { biometrics, keyGen, utilities } from '../../../native-services';
import { utils, errors, constants } from '../../../global';

const { getFetchInstance, addMethod } = utils;
const { NetworkError } = errors;

async function registerTotp({ endpoint, token, ignoreSsl }) {
    try {
        const rnFetch = getFetchInstance({ ignoreSsl });
        const result = await rnFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

async function registerUserPresence({ endpoint, token, accId, ignoreSsl }) {
    const rnFetch = getFetchInstance({ ignoreSsl });
    const { uuid } = await utilities.getUUID();
    const keyHandle = uuid + '.' + constants.ACCOUNT_METHODS.USER_PRESENCE;
    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods`;
    try {
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
                            algorithm: 'SHA256withRSA',
                            publicKey,
                            enabled: true
                        }
                    ]
                }
            ]
        });
        const result = await rnFetch(
            'PATCH',
            url,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body
        );
        await addMethod({
            method: constants.ACCOUNT_METHODS.USER_PRESENCE,
            accId,
            keyHandle
        });
        return result;
    } catch (error) {
        throw new NetworkError({ message: 'Unable to connect to server!' });
    }
}

async function registerBiometrics({ endpoint, token, accId }) {
    const rnFetch = getFetchInstance();
    const { uuid } = await utilities.getUUID();
    const keyHandle = uuid + '.' + constants.ACCOUNT_METHODS.FINGERPRINT;

    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods`;
    try {
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
                                algorithm: 'SHA256withRSA',
                                publicKey,
                                enabled: true
                            }
                        ]
                    }
                ]
            });
            await rnFetch(
                'PATCH',
                url,
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body
            );
            await addMethod({
                method: constants.ACCOUNT_METHODS.FINGERPRINT,
                accId,
                keyHandle
            });
            return;
        }
        throw new Error('Unable to verify fingerprint.');
    } catch (error) {
        throw error;
    }
}

export default { registerBiometrics, registerTotp, registerUserPresence };
export { registerBiometrics, registerUserPresence, registerTotp };
