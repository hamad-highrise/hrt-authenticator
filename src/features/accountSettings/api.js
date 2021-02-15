import getInsecureFetch from '../addAccount/RNFetch';

async function removeSamAccount(endpoint, authId, token) {
    try {
        const insecureFetch = getInsecureFetch();

        const url =
            endpoint +
            '?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators';

        const path =
            'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators[id eq ' +
            authId +
            ']';
        const body = JSON.stringify({
            schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
            Operations: [
                {
                    op: 'remove',
                    path
                }
            ]
        });
        const result = await insecureFetch(
            'PATCH',
            url,
            {
                Accept: 'aplication/json',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body
        );
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function unregisterTotp(endpoint, token) {
    const body = JSON.stringify({
        schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
        Operations: [
            {
                op: 'remove',
                path:
                    'urn:ietf:params:scim:schemas:extension:isam:1.0:OTP:totpEnrolled'
            }
        ]
    });
    const insecureFetch = getInsecureFetch();
    try {
        const result = await insecureFetch(
            'PATCH',
            endpoint,
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

export default { removeSamAccount, unregisterTotp };
export { removeSamAccount, unregisterTotp };
