import utilities from './native';
import { Vibration } from 'react-native';
import { NativeError } from '../../global/errors';

async function preventScreenshot() {
    try {
        await utilities.preventScreenshot();
        return;
    } catch (error) {
        throw new NativeError({ message: 'PREVENT_SS_ERROR' });
    }
}

async function allowScreenshot() {
    try {
        utilities.allowScreenshot();
        return;
    } catch (error) {
        throw new NativeError({ message: 'ALLOW_SS_ERROR' });
    }
}

async function getDeviceInfo() {
    try {
        const info = await utilities.getDeviceInfo();
        const { type, oSVersion, frontCameraAvailable, name, rooted } = info;
        return {
            type,
            osVersion: oSVersion,
            frontCameraAvailable,
            name,
            rooted
        };
    } catch (error) {
        console.warn(error);
        throw new NativeError({ message: 'DEVICE_DETAILS_ERROR' });
    }
}

async function isInitiated() {
    try {
        const { initiated } = await utilities.isInitiated();
        console.warn('is initiated', initiated);
        return initiated;
    } catch (error) {
        throw new NativeError({ message: 'IS_INITIATED_ERROR' });
    }
}

async function setInitiated() {
    try {
        await utilities.setInitiated();
        return;
    } catch (error) {
        throw new NativeError({ message: 'SET_INITIATED_ERROR' });
    }
}

function vibrate() {
    Vibration.vibrate();
}

async function checkDeviceSecurity() {
    try {
        return await utilities.checkDeviceSecurity();
    } catch (error) {
        throw new NativeError({ message: 'CHECK_DEVICE_SECURITY' });
    }
}

async function getUUID() {
    try {
        const { uuid } = await utilities.getUUID();
        return { uuid };
    } catch (error) {
        throw new NativeError({ message: 'UUID_GENERATION_ERROR' });
    }
}

export default {
    preventScreenshot,
    getDeviceInfo,
    isInitiated,
    setInitiated,
    vibrate,
    getUUID,
    allowScreenshot,
    checkDeviceSecurity
};
export {
    preventScreenshot,
    getDeviceInfo,
    isInitiated,
    setInitiated,
    vibrate,
    getUUID,
    allowScreenshot,
    checkDeviceSecurity
};
