import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createStackNavigator();

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
