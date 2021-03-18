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
    promptMessage = 'Please Verify',
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

const createBiomerticKey = async (keyHandle = 'biometricKeyHandle') => {
    try {
        const { publicKey } = await BiometricAndroid.createBiometricKeys(
            keyHandle
        );
        return Promise.resolve({ publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
};

const signChallengeWithBiometric = async ({
    promptMessage = 'Please Verify',
    cancelButtonText = 'Cancel',
    keyHandle = 'biomerticKeyHandle',
    payload
}) => {
    try {
        const { success, signature } = await BiometricAndroid.signPayload({
            promptMessage,
            cancelButtonText,
            keyHandle,
            payload
        });
        return Promise.resolve({ success, signature });
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    isSensorAvailable,
    displaySimplePrompt,
    createBiomerticKey,
    signChallengeWithBiometric
};


