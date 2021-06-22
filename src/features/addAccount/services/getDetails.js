import api from './api';
import { errors } from '../../../global';

const { SAMError } = errors;

async function getDetails({ endpoint, ignoreSsl }) {
    try {
        const result = await api.getDetails({ endpoint, ignoreSsl });
        if (result.respInfo.status !== 200) {
            throw new SAMError({
                message: 'ERROR_GETTING_SAM_DETAILS',
                displayMessage: 'Unable to get details from SAM.'
            });
        }
        const details = await result.json();
        return {
            endpoints: {
                otp: details['totp_shared_secret_endpoint'],
                enrollment: details['enrollment_endpoint'],
                transaction: details['authntrxn_endpoint'],
                token: details['token_endpoint']
            },
            serviceName: details['metadata']['service_name'],
            methodsSupported: details['discovery_mechanisms'].map((mech) =>
                mech.split(':').pop()
            )
        };
    } catch (error) {
        throw error;
    }
}

export default getDetails;
