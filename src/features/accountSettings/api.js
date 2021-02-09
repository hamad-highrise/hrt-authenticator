import getInsecureFetch from '../addAccount/RNFetch';

async function removeSamAccount(endpoint, authId, token) {
    try {
        const insecureFetch = getInsecureFetch();

        const url =
            endpoint +
            '?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators';

        const path =
            'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:authenticators[id.eq.' +
            authId +
            ']';
        console.warn(path);
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

export default { removeSamAccount };
export { removeSamAccount };
