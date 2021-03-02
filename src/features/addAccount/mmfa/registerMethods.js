import getInsecureFetch from '../RNFetch';
import { createKeys } from '../../../util/KeyGen';
import biometrics from '../../../util/biometrics';

async function registerTotp(endpoint, token) {
    try {
        const insecureFetch = getInsecureFetch();
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

async function registerUserPresence(endpoint, token) {
    const insecureFetch = getInsecureFetch();
    const keyHandle = 'Account.' + Date.now() + '.UserPresence';
    const url =
        endpoint +
        `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods`;
    try {
        const { publicKey } = await createKeys(keyHandle);
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
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function registerBiometrics(endpoint, token) {
    const insecureFetch = getInsecureFetch();
    const keyHandle = 'Account.' + Date.now() + '.Biometric';

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
            return Promise.resolve(result);
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { registerBiometrics, registerTotp, registerUserPresence };
export { registerBiometrics, registerUserPresence, registerTotp };
