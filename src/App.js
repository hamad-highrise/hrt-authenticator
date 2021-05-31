import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import screenIds from './navigation/screensId';
import ErrorBoundary from './features/errorBoundry/ErrorBoundry';
import store from './redux.js';
import { utilsActions } from './features/actions.public';
import {
    QRScanScreen,
    ManualAccountScreen as ManualScreen,
    CodeScreen,
    BiometricOption,
    DeviceInfoScreen,
    SuccessScreen,
    CompletionScreen,
    SplashScreen,
    SecurityAssessmentScreen
} from './features';
import {
    AccountsScreen,
    TransactionScreen,
    RootedDeviceScreen,
    TransactionResponseScreen,
    TransactionErrorScreen
} from './features/screens';

enableScreens();
const Stack = createStackNavigator();

NetInfo.fetch()
    .then((state) => {
        store.dispatch(utilsActions.newtorkStateUpdate(state.isConnected));
    })
    .catch((err) => store.dispatch(utilsActions.failure()));

NetInfo.addEventListener((status) => {
    store.dispatch(utilsActions.newtorkStateUpdate(status.isConnected));
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
                    <Screen name={screenIds.main} component={AccountsScreen} />
                    <Screen name={screenIds.qrScan} component={QRScanScreen} />
                    <Screen
                        name={screenIds.accountForm}
                        component={ManualScreen}
                    />
                    <Screen
                        name={screenIds.authTransaction}
                        component={TransactionScreen}
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
                    <Screen
                        name={screenIds.rooted}
                        component={RootedDeviceScreen}
                    />
                    <Screen
                        name={screenIds.transactionResponse}
                        component={TransactionResponseScreen}
                    />
                    <Screen
                        name={screenIds.transactionError}
                        component={TransactionErrorScreen}
                    />
                </Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
