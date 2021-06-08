import config from 'react-native-config';
import { productFlavors } from '../global/constants';

let images;
let icons;

if (config.PRODUCT_FLAVOR === productFlavors.ALFALAH) {
    icons = {
        backArrow: require('./alfalah/icons/back_arrow.png'),
        cross: require('./alfalah/icons/cross.png'),
        qrCode: require('./alfalah/icons/qr_code.png'),
        refresh: require('./alfalah/icons/refresh.png'),
        setting: require('./alfalah/icons/setting_outlined.png')
    };
    images = {};
} else if (config.PRODUCT_FLAVOR === productFlavors.FIDELITY) {
    icons = {
        backArrow: require('./fidelity/icons/back_arrow.png'),
        cross: require('./fidelity/icons/cross.png'),
        qrCode: require('./fidelity/icons/qr_code.png'),
        refresh: require('./fidelity/icons/refresh.png'),
        setting: require('./fidelity/icons/setting_outlined.png')
    };
    images = {};
} else {
    //hrt
    icons = {
        backArrow: require('./highrise/icons/back_arrow.png'),
        cross: require('./highrise/icons/cross.png'),
        qrCode: require('./highrise/icons/qr_code.png'),
        refresh: require('./higrhise/icons/refresh.png'),
        setting: require('./higrhise/icons/setting_outlined.png')
    };
}

export default { images, icons };
