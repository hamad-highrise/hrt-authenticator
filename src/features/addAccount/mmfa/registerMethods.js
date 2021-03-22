import { getFetchInstance, constants } from '../../services';
import { addMethod } from '../services';
import { biometrics, keyGen } from '../../../native-services';

async function registerTotp({ endpoint, token }) {
    try {
        const insecureFetch = getFetchInstance();
        const result = await insecureFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerUserPresence({ endpoint, token, name, issuer, accId }) {
    const insecureFetch = getFetchInstance();
    const keyHandle =
        name + '.' + issuer + '.' + constants.ACCOUNT_METHODS.USER_PRESENCE;
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
        const result = await insecureFetch(
            'PATCH',
            url,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body
        );
        addMethod({
            method: constants.ACCOUNT_METHODS.USER_PRESENCE,
            accId,
            keyHandle
        });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerBiometrics({ endpoint, token, name, issuer, accId }) {
    const insecureFetch = getFetchInstance();
    const keyHandle =
        name + '.' + issuer + '.' + constants.ACCOUNT_METHODS.FINGERPRINT;

    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods`;
    try {
        // const {} = await biometrics.

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
            const result = await insecureFetch(
                'PATCH',
                url,
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body
            );
            addMethod({
                method: constants.ACCOUNT_METHODS.FINGERPRINT,
                accId,
                keyHandle
            });
            return Promise.resolve(result);
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { registerBiometrics, registerTotp, registerUserPresence };
export { registerBiometrics, registerUserPresence, registerTotp };
