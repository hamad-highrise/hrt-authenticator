import { NativeModules, Platform } from 'react-native';

async function getDeviceInformation() {
    //check device rooted or not
    const { Utilites } = NativeModules;
    try {
        const {
            osVersion,
            frontCamera,
            model: name
        } = await Utilites.getDeviceInfo();
        return Promise.resolve({
            type: Platform.OS === 'android' ? 'Android' : 'iOS',
            oSVersion: osVersion,
            frontCameraSupport: frontCamera,
            name
        });
    } catch (error) {}
}

async function preventScreenshot() {
    const { Utilites } = NativeModules;
    try {
        await Utilites.addSecureFlag();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}

export default { getDeviceInformation, preventScreenshot };
