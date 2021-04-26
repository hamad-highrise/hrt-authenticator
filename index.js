import 'react-native-gesture-handler';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from './src/redux.js';
import navigation from './src/navigation';
import NetInfo from '@react-native-community/netinfo';
import { alertActions } from './src/features/alert';

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
} from './src/features';
import { APIErrorBoundry } from './src/features/errorBoundry';

registerScreens();

NetInfo.fetch()
    .then((state) =>
        store.dispatch(alertActions.netStateChanged(state.isConnected))
    )
    .catch((err) => store.dispatch(alertActions.failure(err)));

NetInfo.addEventListener((status) => {
    store.dispatch(alertActions.netStateChanged(status.isConnected));
});

navigation.setInitialRoot();

function registerScreens() {
    //Before registering a screen, add it's identifier in ./screensId.js
    //Register the screens here

    Navigation.registerComponent(navigation.screenIds.main, () => (props) => (
        <Provider store={store}>
            <APIErrorBoundry {...props}>
                <MainScreen {...props} />
            </APIErrorBoundry>
        </Provider>
    ));

    Navigation.registerComponent(
        navigation.screenIds.biometricOption,
        () => (props) => (
            <Provider store={store}>
                <BiometricOption {...props} />
            </Provider>
        )
    );

    Navigation.registerComponent(navigation.screenIds.splash, () => (props) => (
        <Provider store={store}>
            <SplashScreen {...props} />
        </Provider>
    ));

    Navigation.registerComponent(navigation.screenIds.qrScan, () => (props) => (
        <Provider store={store}>
            <QRScanScreen {...props} />
        </Provider>
    ));

    Navigation.registerComponent(
        navigation.screenIds.accessCode,
        () => (props) => (
            <Provider store={store}>
                <CodeScreen {...props} />
            </Provider>
        )
    );

    Navigation.registerComponent(
        navigation.screenIds.authTransaction,
        () => (props) => (
            <Provider store={store}>
                <AuthScreen {...props} />
            </Provider>
        )
    );

    Navigation.registerComponent(
        navigation.screenIds.welcome,
        () => WelcomeScreen
    );
    Navigation.registerComponent(
        navigation.screenIds.deviceInfo,
        () => DeviceInfoScreen
    );
    Navigation.registerComponent(
        navigation.screenIds.accountForm,
        () => ManualScreen
    );

    // Notification Screens
    Navigation.registerComponent(
        navigation.screenIds.success,
        () => SuccessScreen
    );
    Navigation.registerComponent(
        navigation.screenIds.complete,
        () => CompletionScreen
    );

    //
    Navigation.registerComponent(
        navigation.screenIds.securityassessment,
        () => SecurityAssessmentScreen
    );
}
