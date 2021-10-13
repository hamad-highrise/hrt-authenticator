import { NativeModules } from 'react-native';

//Not implemented in iOS

async function getFirebaseToken() {
    const { RNPush } = NativeModules;
    try {
        const result = await RNPush.getAPNsToken();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
    return { pushToken: null };
}

export default { getFirebaseToken };
