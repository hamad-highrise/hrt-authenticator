import { NativeError } from '../../global/errors';
import native from './native';

async function getFirebaseToken() {
    try {
        const { pushToken } = await native.getFirebaseToken();
        return { pushToken };
    } catch (error) {
        throw new NativeError({ message: 'PUSH_TOKEN_ERROR' });
    }
}

export default { getFirebaseToken };
export { getFirebaseToken };
