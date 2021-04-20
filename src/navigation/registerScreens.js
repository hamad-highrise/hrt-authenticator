import React from 'react';
import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import store from '../redux.js';
import screensId from './screensId';
import {
    WelcomeScreen,
    MainScreen,
    QRScanScreen,
    ManualAccountScreen as ManualScreen,
    CodeScreen,
    AuthScreen,
    BiometricOption,
    DeviceInfoScreen,
    SuccessScreen,
    CompletionScreen,
    SplashScreen,
    SecurityAssessmentScreen
} from '../features';

import { APIErrorBoundry } from '../features/errorBoundry';

/**
 * Function registers defined screens with RN Navigation. New Screen must be added in src/navigation/registerScreens.js.
 * This function should be called in index.js in root folder.
 */

//Later, Redux Provider will be added here.

function registerScreens() {
    //Before registering a screen, add it's identifier in ./screensId.js
    //Register the screens here

    Navigation.registerComponent(screensId.main, () => (props) => (
        <Provider store={store}>
            <APIErrorBoundry {...props}>
                <MainScreen {...props} />
            </APIErrorBoundry>
        </Provider>
    ));

    Navigation.registerComponent(screensId.biometricOption, () => (props) => (
        <Provider store={store}>
            <BiometricOption {...props} />
        </Provider>
    ));

    Navigation.registerComponent(screensId.splash, () => (props) => (
        <Provider store={store}>
            <SplashScreen {...props} />
        </Provider>
    ));

    Navigation.registerComponent(screensId.qrScan, () => (props) => (
        <Provider store={store}>
            <QRScanScreen {...props} />
        </Provider>
    ));

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

    Navigation.registerComponent(screensId.welcome, () => WelcomeScreen);
    Navigation.registerComponent(screensId.deviceInfo, () => DeviceInfoScreen);
    Navigation.registerComponent(screensId.accountForm, () => ManualScreen);

    // Notification Screens
    Navigation.registerComponent(screensId.success, () => SuccessScreen);
    Navigation.registerComponent(screensId.complete, () => CompletionScreen);

    //
    Navigation.registerComponent(
        screensId.securityassessment,
        () => SecurityAssessmentScreen
    );
}

export default registerScreens;
