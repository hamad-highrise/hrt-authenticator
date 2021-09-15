import { NativeModules } from 'react-native';

const { RNBiometrics } = NativeModules;

const isSensorAvailable = async () => {
    try {
        const result = await RNBiometrics.isSensorAvailable();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const displaySimplePrompt = async (message = 'Sample Message') => {
    try {
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    isSensorAvailable,
    displaySimplePrompt
};
