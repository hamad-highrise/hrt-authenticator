import { Navigation } from 'react-native-navigation';
import { MainScreen, QRScanScreen, AddAccountScreen } from './src/screens';

// import App from './App';

Navigation.registerComponent('authenticator.MainScreen', () => MainScreen);
Navigation.registerComponent('authenticator.QRScanScreen', () => QRScanScreen);
Navigation.registerComponent(
    'authenticator.AddAccountScreen',
    () => AddAccountScreen
);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'authenticator.MainScreen',
                            options: {
                                topBar: {
                                    visible: false
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
});
