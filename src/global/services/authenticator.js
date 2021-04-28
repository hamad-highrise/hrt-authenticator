import { SAMError } from '../errors';
import { getEnrollmentEndpoint } from '../util';
import { getRegisteredAuthenticators } from './api';
import { getAccessToken } from './token';

async function getAuthenticators({ accId, ignoreSsl }) {
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
            const authenticators = await result.json()?.[
                'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator'
            ]?.['authenticators'];
            return authenticators ?? []; //returns an empty array if null/undefined
        } else {
            throw new SAMError({ message: 'ERROR_GETTING_AUTHENTICATORS' });
        }
    } catch (error) {
        throw error;
    }
}

export default { getAuthenticators };
export { getAuthenticators };
