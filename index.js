import n from './src/navigation';

n.registerScreens();
n.setRoot();

// import {
//     MainScreen,
//     QRScanScreen,
//     AddAccountScreen,
//     AccessCodeScreen,
//     AccountSettingsScreen,
//     CodeAccountScreen,
//     DeviceInfoScreen,
//     BiometricOption,
//     NotifyProcessComplete,
//     NotifyError,
//     SplashScreen,
//     EmptyStateScreen
// } from './src/screens';
// import Database from './src/util/sqlite';

// (async () => {
//     try {
//         const database = new Database();
//         await database.init();
//         await database.setUpDatabase();
//         // await NativeModules.Utilities.addSecureFlag();

//         database.closeConn();
//     } catch (error) {
//         alert(JSON.stringify(error));
//     }
// })();

// Navigation.registerComponent('authenticator.MainScreen', () => MainScreen);
// Navigation.registerComponent('authenticator.QRScanScreen', () => QRScanScreen);
// Navigation.registerComponent('authenticator.AccountForm', () => AddAccountForm);
// Navigation.registerComponent(
//     'authenticator.AddAccountScreen',
//     () => AddAccountScreen
// );
// Navigation.registerComponent(
//     'authenticator.AccessCodeScreen',
//     () => AccessCodeScreen
// );
// Navigation.registerComponent(
//     'authenticator.AccountSettingsScreen',
//     () => AccountSettingsScreen
// );
// Navigation.registerComponent(
//     'authenticator.CodeAccountScreen',
//     () => CodeAccountScreen
// );
// Navigation.registerComponent(
//     'authenticator.DeviceInfoScreen',
//     () => DeviceInfoScreen
// );
// Navigation.registerComponent(
//     'authenticator.BiometricOption',
//     () => BiometricOption
// );
// Navigation.registerComponent(
//     'authenticator.NotifyProcessComplete',
//     () => NotifyProcessComplete
// );
// Navigation.registerComponent(
//     'authenticator.BiometricOption',
//     () => BiometricOption
// );
// Navigation.registerComponent('authenticator.NotifyError', () => NotifyError);
// Navigation.registerComponent('authenticator.SplashScreen', () => SplashScreen);
// Navigation.registerComponent(
//     'authenticator.EmptyStateScreen',
//     () => EmptyStateScreen
// );
// Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 children: [
//                     {
//                         component: {
//                             name: 'authenticator.MainScreen',
//                             options: {
//                                 topBar: {
//                                     visible: false
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             }
//         }
//     });
// });
