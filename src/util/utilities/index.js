import utilities from './native/index.android';

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

async function isInitialStart() {
    try {
        const initiated = await utilities.isInitialStart();
        return Promise.resolve({ initiated });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { preventScreenshot, getDeviceInfo, isInitialStart };
export { preventScreenshot, getDeviceInfo, isInitialStart };
