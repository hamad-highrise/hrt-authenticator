import { NativeModules } from 'react-native';

const isSensorAvailable = async () => {
    try {
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
