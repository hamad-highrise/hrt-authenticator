import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import screenIds from './navigation/screensId';
import store from './redux';
import { utilsActions } from './features/actions.public';
import {
    DeviceInfoScreen,
    SplashScreen,
    SecurityAssessmentScreen
} from './features';
import {
    AccountsScreen,
    TransactionScreen,
    RootedDeviceScreen,
    TransactionResponseScreen,
    TransactionErrorScreen,
    AccessCode,
    ManualAccount,
    AddAccount,
    SuccessScreen,
    CompletionScreen,
    RegisterBiometrics
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
                    <Screen name={screenIds.qrScan} component={AddAccount} />
                    <Screen
                        name={screenIds.accountForm}
                        component={ManualAccount}
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
                        component={RegisterBiometrics}
                    />
                    <Screen
                        name={screenIds.accessCode}
                        component={AccessCode}
                    />

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
