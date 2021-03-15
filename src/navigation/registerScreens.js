import { Navigation } from 'react-native-navigation';
import screensId from './screensId';
import {
    WelcomeScreen,
    EmptyStateScreen,
    MainScreen,
    AddAccountScreen,
    QRScanScreen,
    ManualAccountScreen as ManualScreen,
    CodeScreen,
    AuthScreen,
    BiometricOption,
    DeviceInfoScreen,
    GetStartedScreen,
    ErrorScreen,
    ProcessComplete
} from '../features';
import { SplashScreen } from '../features/Splash';

/**
 * Function registers defined screens with RN Navigation. New Screen must be added in src/navigation/registerScreens.js.
 * This function should be called in index.js in root folder.
 */

//Later, Redux Provider will be added here.

function registerScreens() {
    //Before registering a screen, add it's identifier in ./screensId.js
    //Register the screens here
    Navigation.registerComponent(screensId.emptyState, () => EmptyStateScreen);
    Navigation.registerComponent(screensId.welcome, () => WelcomeScreen);
    Navigation.registerComponent(screensId.main, () => MainScreen);
    Navigation.registerComponent(screensId.addAccount, () => AddAccountScreen);
    Navigation.registerComponent(screensId.qrScan, () => QRScanScreen);
    Navigation.registerComponent(screensId.accountForm, () => ManualScreen);
    Navigation.registerComponent(screensId.accessCode, () => CodeScreen);
    Navigation.registerComponent(screensId.authTransaction, () => AuthScreen);
    Navigation.registerComponent(
        screensId.biometricOption,
        () => BiometricOption
    );
    Navigation.registerComponent(screensId.deviceInfo, () => DeviceInfoScreen);
    Navigation.registerComponent(screensId.getstarted, () => GetStartedScreen);
    Navigation.registerComponent(screensId.splash, () => SplashScreen);
    Navigation.registerComponent(screensId.error, () => ErrorScreen);
    Navigation.registerComponent(screensId.processcomplete, () => ProcessComplete);
}

export default registerScreens;
