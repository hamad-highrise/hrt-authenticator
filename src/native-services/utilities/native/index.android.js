import { NativeModules, Platform } from 'react-native';

async function getDeviceInfo() {
    //TODO: check device rooted or not
    const { Utilities } = NativeModules;
    try {
        const {
            osVersion,
            frontCamera,
            model: name,
            rooted
        } = await Utilities.getDeviceInfo();
        return Promise.resolve({
            type: Platform.OS === 'android' ? 'Android' : 'iOS',
            oSVersion: osVersion,
            frontCameraAvailable: frontCamera,
            name,
            rooted
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function isInitiated() {
    const { Utilities } = NativeModules;

    try {
        const result = await Utilities.isInitiated();
        return Promise.resolve(result);
    } catch (error) {
        console.warn(error);
        return Promise.reject(error);
    }
}

async function setInitiated() {
    const { Utilities } = NativeModules;
    try {
        await Utilities.setInitiated();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function preventScreenshot() {
    const { Utilities } = NativeModules;
    try {
        await Utilities.addSecureFlag();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}

async function allowScreenshot() {
    const { Utilities } = NativeModules;
    try {
        Utilities.removeSecureFlag();
        return;
    } catch (error) {
        throw error;
    }
}

async function getUUID() {
    const { Utilities } = NativeModules;
    try {
        const result = Utilities.getUUID();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    getDeviceInfo,
    preventScreenshot,
    isInitiated,
    setInitiated,
    getUUID,
    allowScreenshot
};

export {
    getDeviceInfo,
    preventScreenshot,
    isInitiated,
    setInitiated,
    getUUID,
    allowScreenshot
};
