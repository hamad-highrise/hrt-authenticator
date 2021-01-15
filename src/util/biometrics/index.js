import { Platform } from 'react-native';
import RNBiometrics from 'react-native-biometrics';

const isSensorAvailable = async () => {
    try {
        const { biometryType } = await RNBiometrics.isSensorAvailable();

        return Promise.resolve(
            Platform.OS === 'android'
                ? biometryType === RNBiometrics.Biometrics
                : biometryType === RNBiometrics.TouchID
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const createKeys = async (secret) => {
    try {
        if (!(await keysExist())) {
            const { publicKey } = await RNBiometrics.createKeys(secret);
            return publicKey;
        } else {
            return new Error('KEYS_ALREADY_EXISTS');
        }
    } catch (error) {
        return error;
    }
};

const keysExist = async () => {
    try {
        const { keysExist } = await RNBiometrics.biometricKeysExist();
        return keysExist;
    } catch (error) {
        return error;
    }
};

const deleteKeys = async () => {
    try {
        if (await keysExist()) {
            const { keysDeleted } = await RNBiometrics.deleteKeys();
            return keysDeleted;
        } else {
            return new Error('NO_KEYS_FOUND');
        }
    } catch (error) {
        return error;
    }
};

const displaySimplePrompt = async (message = 'Sample Message') => {
    try {
        if (await isSensorAvailable()) {
            const { success } = await RNBiometrics.simplePrompt({
                promptMessage: message
            });
            return Promise.resolve(success);
        } else return Promise.reject(new Error('SENSOR_NOT_AVAILABLE'));
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
};

const createSignature = async () => {};

export default {
    isSensorAvailable,
    createKeys,
    createKeys,
    deleteKeys,
    displaySimplePrompt,
    createSignature
};
