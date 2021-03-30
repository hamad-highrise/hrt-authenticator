import { cipher } from '../../../native-services';
import { constants } from '../../services';
import { getSecretByAccountId } from './queries';

async function getSecret(accId) {
    try {
        const secret = await getSecretByAccountId(accId);
        const { decrypted } = await cipher.decrypt({
            keyAlias: constants.KEY_ALIAS.SECRET,
            cipherText: secret
        });
        return decrypted;
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getSecret };
export { getSecret };
export { default as totpGenerator } from './totp';
