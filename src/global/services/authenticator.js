import { SAMError } from '../errors';
import { getEnrollmentEndpoint, getAuthIdByAccount } from '../util';
import { getRegisteredAuthenticators } from './api';
import { getAccessToken } from './token';

async function checkAuthenticatorValiditiy({ accId, ignoreSsl }) {
    try {
        const accessToken = await getAccessToken(accId);
        const enrollmentEndpoint = await getEnrollmentEndpoint(accId);
        const result = await getRegisteredAuthenticators({
            endpoint: enrollmentEndpoint,
            token: accessToken,
            ignoreSsl
        });
        const { status } = result.respInfo;
        if ((status >= 200 && status <= 299) || status === 304) {
            const authenticators =
                (await result.json()?.[
                    'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator'
                ]?.['authenticators']) ?? []; //returns an empty array if null/undefined
            const current = await getAuthIdByAccount(accId);
            const found = authenticators.findIndex(
                (authenticator) => authenticator.id === current
            );

            return !(found === -1);
        } else {
            throw new SAMError({ message: 'ERROR_GETTING_AUTHENTICATORS' });
        }
    } catch (error) {
        throw error;
    }
}

export default { checkAuthenticatorValiditiy };
export { checkAuthenticatorValiditiy };
