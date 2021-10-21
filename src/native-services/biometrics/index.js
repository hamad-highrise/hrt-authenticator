import { Platform } from 'react-native';
import { NativeError } from '../../global/errors';
import native from './native';

async function isSensorAvailable() {
    try {
        const { available, error } = await native.isSensorAvailable();
        return { available, error };
    } catch (error) {
        typeof error === 'string' && alert(error);
        throw new NativeError({
            message: 'SENSOR_CHECK_ERROR',
            displayMessage: error
        });
    }
}

async function showBiometricPrompt({ promptMessage, cancelButtonText }) {
    try {
        if (Platform.OS === 'android') {
            const { success } = await native.displaySimplePrompt({
                promptMessage,
                cancelButtonText
            });
            return { success };
        } else {
            const { success } = await native.displaySimplePrompt(promptMessage);
            return { success };
        }
    } catch (error) {
        alert(error);

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
    promptMessage = 'Please Verify',
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
        throw new NativeError({
            message: 'SIGN_PAYLOAD_ERROR'
            // displayMessage: error
        });
    }
}

export default {
    isSensorAvailable,
    showBiometricPrompt,
    createBiomerticKey,
    signPayload
};
