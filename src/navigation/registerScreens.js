import React from 'react';
import { Navigation } from 'react-native-navigation';
import screensId from './screensId';
import { Provider } from 'react-redux';
import store from '../redux.js';
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
    PrivacyPolicyScreen,
    TermAndConditionScreen,
    ThirdPartyNoticeScreen,
    SecurityAssessmentScreen,
    SuccessScreen,
    CompletionScreen
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
    Navigation.registerComponent(screensId.main, () => (props) => (
        <Provider store={store}>
            <MainScreen {...props} />
        </Provider>
    ));
    Navigation.registerComponent(screensId.addAccount, () => AddAccountScreen);
    Navigation.registerComponent(screensId.qrScan, () => QRScanScreen);
    Navigation.registerComponent(screensId.accountForm, () => ManualScreen);
    Navigation.registerComponent(screensId.accessCode, () => (props) => (
        <Provider store={store}>
            <CodeScreen {...props} />
        </Provider>
    ));
    Navigation.registerComponent(screensId.authTransaction, () => (props) => (
        <Provider store={store}>
            <AuthScreen {...props} />
        </Provider>
    ));
    Navigation.registerComponent(
        screensId.biometricOption,
        () => BiometricOption
    );
    Navigation.registerComponent(screensId.deviceInfo, () => DeviceInfoScreen);
    Navigation.registerComponent(screensId.getstarted, () => GetStartedScreen);
    Navigation.registerComponent(screensId.splash, () => SplashScreen);
    Navigation.registerComponent(screensId.error, () => ErrorScreen);
    Navigation.registerComponent(
        screensId.privacypolicy,
        () => PrivacyPolicyScreen
    );
    Navigation.registerComponent(
        screensId.termandcondition,
        () => TermAndConditionScreen
    );
    Navigation.registerComponent(
        screensId.thirdpartynotice,
        () => ThirdPartyNoticeScreen
    );
    Navigation.registerComponent(
        screensId.securityassessment,
        () => SecurityAssessmentScreen
    );

    Navigation.registerComponent(screensId.success, () => SuccessScreen);
    Navigation.registerComponent(screensId.complete, () => CompletionScreen);
}

export default registerScreens;
