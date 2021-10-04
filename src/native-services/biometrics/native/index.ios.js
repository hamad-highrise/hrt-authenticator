import { NativeModules } from 'react-native';

const { RNBiometrics } = NativeModules;

const isSensorAvailable = async () => {
    try {
        const result = await RNBiometrics.isSensorAvailable();
        return Promise.resolve(result);
    } catch (error) {
        throw error;
    }
};

const displaySimplePrompt = async (message = 'Sample Message') => {
    try {
        const result = await RNBiometrics.showSimplePrompt(message);
        return result;
    } catch (error) {
        throw error;
    }
};

const createBiomerticKey = async (keyHandle) => {
    try {
        const result = await RNBiometrics.createKeys(keyHandle);
        return result;
    } catch (error) {
        throw error;
    }
};

const signChallengeWithBiometric = async ({
    keyHandle,
    promptMessage,
    payload
}) => {
    try {
        const result = await RNBiometrics.signPayload({
            keyAlias: keyHandle,
            promptMessage,
            payload
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export default {
    isSensorAvailable,
    displaySimplePrompt,
    createBiomerticKey,
    signChallengeWithBiometric
};
