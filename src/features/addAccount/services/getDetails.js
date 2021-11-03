import api from './api';
import { errors } from '../../../global';

const { SAMError } = errors;

/** @module Details */

/**
 * @typedef Endpoints
 * @property {string} otp - TOTP Details Endpoint
 * @property {string} enrollment - Authentication Method Enrollment Endpoint
 * @property {string} transaction - Authentication Transaction Check Endpoint
 * @property {string} token - Token Fetch Endpoint
 */

/**
 * @typedef Details
 * @property {Endpoints} endpoints - Object containing endpoints
 * @property {string} serviceName - Name of the service
 * @property {Array<string>} methodsSupported - Methods Supported by MMFA Service
 */

/**
 *
 * @param {{endpoint:string, ignoreSsl:boolean}} param0
 * @returns {Details} Details required for MMFA
 */

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
