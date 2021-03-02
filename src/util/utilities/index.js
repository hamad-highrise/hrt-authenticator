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
        console.warn(info);
        const { type, oSVersion, frontCameraAvailable, name, rooted } = info;
        return Promise.resolve({
            type,
            osVersion: oSVersion,
            frontCameraAvailable,
            name,
            rooted
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

function vibrate() {
    Vibration.vibrate();
}

async function getUUID() {
    try {
        const { uuid } = await utilities.getUUID();
        return Promise.resolve({ uuid });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    preventScreenshot,
    getDeviceInfo,
    isInitiated,
    setInitiated,
    vibrate,
    getUUID
};
export {
    preventScreenshot,
    getDeviceInfo,
    isInitiated,
    setInitiated,
    vibrate,
    getUUID
};
