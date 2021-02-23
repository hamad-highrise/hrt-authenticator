import { NativeModules } from 'react-native';

async function createKeys(keyHandle) {
    const { CustomKeyGen } = NativeModules;
    try {
        const { publicKey } = await CustomKeyGen.createKeys(keyHandle);
        return Promise.resolve({ publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function signPayload({ keyHandle, payload }) {
    const { CustomKeyGen } = NativeModules;
    try {
        const result = await CustomKeyGen.signPayload(keyHandle, payload);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { createKeys, signPayload };
