import { NativeModules } from 'react-native';

async function createKeys(keyHandle) {
    const { RNKeyGen } = NativeModules;
    try {
        const { publicKey } = await RNKeyGen.createKeys(keyHandle);
        return Promise.resolve({ publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function signPayload({ keyHandle: keyAlias, payload }) {
    const { RNKeyGen } = NativeModules;
    try {
        const result = await RNKeyGen.signPayload({keyAlias, payload});
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { createKeys, signPayload };
