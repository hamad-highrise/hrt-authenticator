import { NativeModules, Platform } from 'react-native';

async function getDeviceInformation() {
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

async function isInitialStart() {
    const { Utilities } = NativeModules;
    try {
        const { initiated } = await Utilities.isInitialStart();
        if (!initiated) {
            await Utilities.setInitiated();
        }
        return Promise.resolve(initiated);
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

export default { getDeviceInformation, preventScreenshot, isInitialStart };
export { getDeviceInformation, preventScreenshot, isInitialStart };
