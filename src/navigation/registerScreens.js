import { Navigation } from 'react-native-navigation';
import screensId from './screensId';
import {
    MainScreen,
    AccessCodeScreen,
    AddAccountForm,
    AccountSettingsScreen as AccSettings,
    QRScanScreen,
    AddAccountScreen
} from '../screens';

/**
 * Function registers defined screens with RN Navigation. New Screen must be added in src/navigation/registerScreens.js.
 * This function should be called in index.js in root folder.
 */

//Later, Redux Provider will be added here.

function registerScreens() {
    //Before registering a screen, add it's identifier in ./screensId.js
    //Register the screens here
    Navigation.registerComponent(screensId.main, () => MainScreen);
    Navigation.registerComponent(screensId.qrScan, () => QRScanScreen);
    Navigation.registerComponent(screensId.addAccount, () => AddAccountScreen);
    Navigation.registerComponent(screensId.accountSettings, () => AccSettings);
    Navigation.registerComponent(screensId.accessCode, () => AccessCodeScreen);
    Navigation.registerComponent(screensId.accountForm, () => AddAccountForm);
}

export default registerScreens;
