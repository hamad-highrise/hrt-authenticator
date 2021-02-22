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

export default { createKeys };
