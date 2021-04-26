import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';

import screenIds from './navigation/screensId';
import ErrorBoundary from './features/errorBoundry/ErrorBoundry';
import store from './redux.js';
import {
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
} from './features';
import { alertActions } from './features/alert';

const Stack = createStackNavigator();

NetInfo.fetch()
    .then((state) =>
        store.dispatch(alertActions.netStateChanged(state.isConnected))
    )
    .catch((err) => store.dispatch(alertActions.failure(err)));

NetInfo.addEventListener((status) => {
    store.dispatch(alertActions.netStateChanged(status.isConnected));
});

const App = () => {
    const { Navigator, Screen } = Stack;
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={screenIds.splash}>
                    <Screen name={screenIds.splash} component={SplashScreen} />
                    <Screen name={screenIds.main} component={MainScreen} />
                    <Screen name={screenIds.qrScan} component={QRScanScreen} />
                    <Screen
                        name={screenIds.accountForm}
                        component={ManualScreen}
                    />
                    <Screen
                        name={screenIds.authTransaction}
                        component={AuthScreen}
                    />
                    <Screen
                        name={screenIds.complete}
                        component={CompletionScreen}
                    />
                    <Screen
                        name={screenIds.success}
                        component={SuccessScreen}
                    />
                    <Screen
                        name={screenIds.biometricOption}
                        component={BiometricOption}
                    />
                    <Screen name={screenIds.accessCode}>
                        {() => (
                            <ErrorBoundary>
                                <CodeScreen />
                            </ErrorBoundary>
                        )}
                    </Screen>
                    <Screen
                        name={screenIds.securityassessment}
                        component={SecurityAssessmentScreen}
                    />
                    <Screen
                        name={screenIds.deviceInfo}
                        component={DeviceInfoScreen}
                    />
                </Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
