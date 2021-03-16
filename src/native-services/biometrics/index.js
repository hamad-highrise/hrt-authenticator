import native from './native';

async function isSensorAvailable() {
    try {
        const { available, error } = await native.isSensorAvailable();
        return Promise.resolve({ available, error });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function showBiometricPrompt({ promptMessage, cancelButtonText }) {
    try {
        const { success, error } = await native.displaySimplePrompt({
            promptMessage,
            cancelButtonText
        });
        return Promise.resolve({ success, error });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function createBiomerticKey(keyHandle) {
    try {
        const result = await native.createBiomerticKey(keyHandle);
        return Promise.resolve({ publicKey: result.publicKey });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function signPayload({
    promptMessage,
    cancelButtonText,
    keyHandle,
    payload
}) {
    try {
        const { success, signature } = await native.signChallengeWithBiometric({
            promptMessage,
            cancelButtonText,
            keyHandle,
            payload
        });
        return Promise.resolve({ success, signature });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    isSensorAvailable,
    showBiometricPrompt,
    createBiomerticKey,
    signPayload
};
