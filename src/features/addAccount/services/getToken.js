import { cipher } from '../../../native-services';
import api from './api';
import { errors, utils, constants } from '../../../global';
import helpers from '../../../helpers';

const { SAMError } = errors;

async function getToken({ endpoint, code, ignoreSsl }) {
    try {
        const body = await utils.getTokenRequestBody({ code });
        const result = await api.getToken({
            endpoint,
            formEncodedData: body,
            ignoreSsl
        });

        if (result.respInfo.status !== 200) {
            throw new SAMError({ message: 'ERROR_FETCHING_TOKEN' });
        }
        const token = await result.json();
        const { cipherText: encryptedToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.TOKEN,
            payload: token['access_token']
        });
        const { cipherText: encryptedRefreshToken } = await cipher.encrypt({
            keyAlias: constants.KEY_ALIAS.TOKEN,
            payload: token['refresh_token']
        });

        return {
            accessToken: encryptedToken,
            unsafeToken: token['access_token'],
            refreshToken: encryptedRefreshToken,
            expiry: helpers.getTokenExpiryInSeconds(token['expires_in']),
            endpoint,
            authenticatorId: token['authenticator_id'],
            accountName: token['display_name']
        };
    } catch (error) {
        throw error;
    }
}

export default getToken;
