import { NativeModules } from 'react-native';

const { BiometricAndroid } = NativeModules;

const isSensorAvailable = async () => {
    try {
        const result = await BiometricAndroid.isSensorAvailable();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const displaySimplePrompt = async ({
    promptMessage = 'Please verify your fingerprint',
    cancelButtonText = 'Cancel'
}) => {
    try {
        const result = await BiometricAndroid.showSimpleBiometricPrompt({
            promptMessage,
            cancelButtonText
        });
        return Promise.resolve(result);
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
};

export default {
    isSensorAvailable,
    displaySimplePrompt
};
