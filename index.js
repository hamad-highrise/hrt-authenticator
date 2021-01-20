import { Navigation } from 'react-native-navigation';
import {
    MainScreen,
    QRScanScreen,
    AddAccountScreen,
    AccessCodeScreen,
    AccountSettingsScreen,
    CodeAccountScreen
} from './src/screens';
import { NativeModules } from 'react-native';
import Database from './src/util/sqlite';

(async () => {
    try {
        const database = new Database();
        await database.init();
        await database.setUpDatabase();
        await NativeModules.Utilities.addSecureFlag();
    } catch (error) {
        alert(JSON.stringify(error));
    }
})();

Navigation.registerComponent('authenticator.MainScreen', () => MainScreen);
Navigation.registerComponent('authenticator.QRScanScreen', () => QRScanScreen);
Navigation.registerComponent(
    'authenticator.AddAccountScreen',
    () => AddAccountScreen
);
Navigation.registerComponent(
    'authenticator.AccessCodeScreen',
    () => AccessCodeScreen
);
Navigation.registerComponent(
    'authenticator.AccountSettingsScreen',
    () => AccountSettingsScreen
);
Navigation.registerComponent(
    'authenticator.CodeAccountScreen',
    () => CodeAccountScreen
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
