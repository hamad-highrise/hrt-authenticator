import { NativeError } from '../../global/errors';
import native from './native';

async function createKeys(keyHandle) {
    try {
        const { publicKey } = await native.createKeys(keyHandle);
        return { publicKey };
    } catch (error) {
        throw new NativeError({ message: 'CREATE_KEYS_ERROR' });
    }
}

async function signPayload({ keyHandle, payload }) {
    try {
        const { success, signature } = await native.signPayload({
            keyHandle,
            payload
        });
        return { success, signature };
    } catch (error) {
        throw new NativeError({ message: 'SIGN_PAYLOAD_ERROR' });
    }
}

export default { createKeys, signPayload };
export { createKeys, signPayload };
