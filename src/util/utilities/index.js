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
        const info = await utilities.getDeviceInfo();
        const { type, oSVersion, frontCameraAvailable, name } = info;
        return Promise.resolve({
            type,
            osVersion: oSVersion,
            frontCameraAvailable,
            name
        });
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

function vibrate(duration) {
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
