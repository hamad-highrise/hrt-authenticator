import native from './native';

async function createKeys(keyHandle) {
    try {
        const { publicKey } = await native.createKeys(keyHandle);
        return Promise.resolve({ publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
}

export { createKeys };
