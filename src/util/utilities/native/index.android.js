import { NativeModules, Platform } from 'react-native';

async function getDeviceInfo() {
    //TODO: check device rooted or not
    const { Utilities } = NativeModules;
    try {
        const {
            osVersion,
            frontCamera,
            model: name
        } = await Utilities.getDeviceInfo();
        return Promise.resolve({
            type: Platform.OS === 'android' ? 'Android' : 'iOS',
            oSVersion: osVersion,
            frontCameraAvailable: frontCamera,
            name
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

export default {
    getDeviceInfo,
    preventScreenshot,
    isInitiated,
    setInitiated
};

export { getDeviceInfo, preventScreenshot, isInitiated, setInitiated };
