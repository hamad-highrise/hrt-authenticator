import utilities from './native/index.android';
import { Vibration } from 'react-native';

async function preventScreenshot() {
    try {
        await utilities.preventScreenshot();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getDeviceInfo() {
    try {
        const {
            type,
            osVersion,
            frontCameraAvailabe,
            name
        } = await utilities.getDeviceInfo();
        return Promise.resolve({ type, osVersion, frontCameraAvailabe, name });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function isInitiated() {
    try {
        const { initiated } = await utilities.isInitiated();
        return Promise.resolve(initiated);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function setInitiated() {
    try {
        await utilities.setInitiated();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}

async function vibrate(duration) {
    Vibration.vibrate();
}

export default {
    preventScreenshot,
    getDeviceInfo,
    isInitiated,
    setInitiated,
    vibrate
};
export { preventScreenshot, getDeviceInfo, isInitiated, setInitiated, vibrate };
