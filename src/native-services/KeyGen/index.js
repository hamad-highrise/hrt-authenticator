import native from './native';

async function createKeys(keyHandle) {
    try {
        const { publicKey } = await native.createKeys(keyHandle);
        return Promise.resolve({ publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function signPayload({ keyHandle, payload }) {
    try {
        const { success, signature } = await native.signPayload({
            keyHandle,
            payload
        });
        return Promise.resolve({ success, signature });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { createKeys, signPayload };
export { createKeys, signPayload };
