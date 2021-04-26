import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import screenIds from './navigation/screensId';
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
        <NavigationContainer>
            <Navigator initialRouteName={screenIds.splash}>
                <Screen name={screenIds.splash} component={SplashScreen} />
                <Screen name={screenIds.main} component={MainScreen} />
            </Navigator>
        </NavigationContainer>
    );
};

export default App;
