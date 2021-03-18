import { NativeModules } from 'react-native';

async function getFirebaseToken() {
    const { RNPush } = NativeModules;
    try {
        const result = await RNPush.getFirebaseToken();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getFirebaseToken };
