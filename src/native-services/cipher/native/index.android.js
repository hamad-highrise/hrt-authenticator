import { NativeModules } from 'react-native';

async function encrypt(params) {
    const { RNCipher } = NativeModules;
    try {
        const result = await RNCipher.encrypt(params);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function decrypt(params) {
    const { RNCipher } = NativeModules;
    try {
        const result = await RNCipher.decrypt(params);
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { encrypt, decrypt };
