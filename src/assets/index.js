import config from 'react-native-config';
import { productFlavors } from '../global/constants';

/**
 * Assests are managed centrally via config according to Product Flavor. Whenever adding new flavors or scheme,
 * follow the steps:
 * 1. Create new folder src/assets named same as product flavor in the config file, e.g. alfalah, with 2 sub folder i.e. images and icons
 * 2. Keep all the images and icons in the respective folder
 * 3. Import all the icons and images conditionally by adding new conditional block
 * @module Assets
 */

/**
 * @typedef Icons
 * @property {any} backArrow Themed Back Arrow
 * @property {any} cross Themed Cross Icon
 * @property {any} qrCode Themed QR Code Icon
 * @property {any} refresh Themed Refresh Icon
 * @property {any} setting Themed Settings Icon
 * @property {any} crossWhite White Cross Icon
 * @property {any} tickWhite White Tick Icon
 * @property {any} crossBlack Black Cross Icon
 * @property {any} addFingerprint Fingerprint Icon
 * @property {any} angleBlack BlackAngle Icon
 * @property {any} edit Edit Icon
 */
/**
 * @typedef Images
 * @property {any} success Success Screen Image
 * @property {any} processComplete Process Complete Image
 * @property {any} authSuccess Authentication Success Image
 * @property {any} authDenied Authentication Denied Image
 * @property {any} logo Company Logo
 * @property {any} error Error Screen Image
 */

/**
 * Contains reference to all images
 * @type {Images}
 */
let images = {};
/**
 * Contains reference to all icons
 * @type {Icons}
 */
let icons = {};

if (config.PRODUCT_FLAVOR === productFlavors.ALFALAH) {
    icons = {
        backArrow: require('./alfalah/icons/back_arrow.png'),
        cross: require('./alfalah/icons/cross.png'),
        qrCode: require('./alfalah/icons/qr_code.png'),
        refresh: require('./alfalah/icons/refresh.png'),
        setting: require('./alfalah/icons/setting_outlined.png')
    };
    images = {
        success: require('./alfalah/images/success.png'),
        processComplete: require('./alfalah/images/process_complete.png'),
        authSuccess: require('./alfalah/images/auth_success.png'),
        authDenied: require('./alfalah/images/auth_fail.png'),
        logo: require('./alfalah/images/logo.png'),
        error: require('./alfalah/images/error_cross.png')
    };
} else if (config.PRODUCT_FLAVOR === productFlavors.FIDELITY) {
    icons = {
        backArrow: require('./fidelity/icons/back_arrow.png'),
        cross: require('./fidelity/icons/cross.png'),
        qrCode: require('./fidelity/icons/qr_code.png'),
        refresh: require('./fidelity/icons/refresh.png'),
        setting: require('./fidelity/icons/setting_outlined.png')
    };
    images = {
        success: require('./fidelity/images/success.png'),
        processComplete: require('./fidelity/images/process_complete.png'),
        authSuccess: require('./fidelity/images/auth_success.png'),
        authDenied: require('./fidelity/images/auth_fail.png'),
        logo: require('./fidelity/images/logo.png'),
        error: require('./fidelity/images/error_cross.png')
    };
} else {
    //hrt
    icons = {
        backArrow: require('./highrise/icons/back_arrow.png'),
        cross: require('./highrise/icons/cross.png'),
        qrCode: require('./highrise/icons/qr_code.png'),
        refresh: require('./highrise/icons/refresh.png'),
        setting: require('./highrise/icons/setting_outlined.png')
    };
    images = {
        success: require('./highrise/images/success.png'),
        processComplete: require('./highrise/images/process_complete.png'),
        authSuccess: require('./highrise/images/auth_success.png'),
        authDenied: require('./highrise/images/auth_fail.png'),
        logo: require('./highrise/images/logo.png'),
        error: require('./highrise/images/error_cross.png')
    };
}

icons = {
    ...icons,
    crossWhite: require('./icons/cross_white.png'),
    tickWhite: require('./icons/tick_white.png'),
    crossBlack: require('./icons/cross_black.png'),
    tickBlack: require('./icons/tick_black.png'),
    addFingerprint: require('./icons/add_fingerprint.png'),
    angleBlack: require('./icons/right_angle_black.png'),
    edit: require('./icons/edit.png')
};

images = {
    ...images,
    biometric: require('./images/bio2.png')
}

export default { images, icons };
