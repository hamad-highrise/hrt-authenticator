import { AppRegistry, NativeEventEmitter, Platform } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { utilities, push } from './src/native-services';

//to prevent screenshot on Android Devices
Platform.OS === 'android' && utilities.preventScreenshot();

push.getFirebaseToken().then(console.log).catch(console.log);

AppRegistry.registerComponent(appName, () => App);
