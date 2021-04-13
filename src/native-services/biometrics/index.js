import { NativeError } from '../../global/errors';
import native from './native';

async function isSensorAvailable() {
    try {
        const { available, error } = await native.isSensorAvailable();
        return { available, error };
    } catch (error) {
        throw new NativeError({ message: 'SENSOR_CHECK_ERROR' });
    }
}

async function showBiometricPrompt({ promptMessage, cancelButtonText }) {
    try {
        const { success, error } = await native.displaySimplePrompt({
            promptMessage,
            cancelButtonText
        });
        return { success, error };
    } catch (error) {
        throw new NativeError({ message: 'SHOW_BIOMETRIC_PROMPT_ERROR' });
    }
}

async function createBiomerticKey(keyHandle) {
    try {
        const result = await native.createBiomerticKey(keyHandle);
        return { publicKey: result.publicKey };
    } catch (error) {
        throw new NativeError({ message: 'CREATE_BIOMETRIC_KEYS_ERROR' });
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
        return { success, signature };
    } catch (error) {
        throw new NativeError({ message: 'SIGN_PAYLOAD_ERROR' });
    }
}

export default {
    isSensorAvailable,
    showBiometricPrompt,
    createBiomerticKey,
    signPayload
};
