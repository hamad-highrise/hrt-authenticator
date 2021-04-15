import { NativeError } from '../../global/errors';
import native from './native';

async function encrypt({ keyAlias, payload }) {
    try {
        const { cipherText } = await native.encrypt({ keyAlias, payload });
        return { cipherText };
    } catch (error) {
        throw new NativeError({ message: 'ENCRYOTION_ERROR' });
    }
}

async function decrypt({ keyAlias, cipherText }) {
    try {
        const { decrypted } = await native.decrypt({ keyAlias, cipherText });
        return {
            decrypted: decrypted.trim() /* trim will remove any padding added */
        };
    } catch (error) {
        throw new NativeError({ message: 'DECRYPTION_ERROR' });
    }
}

export default { encrypt, decrypt };
export { encrypt, decrypt };
