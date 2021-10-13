import 'react-native-gesture-handler';
import { AppRegistry, NativeEventEmitter } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { utilities } from './src/native-services';
import Config from 'react-native-config';


console.log(Config.getConstants())

// utilities.preventScreenshot();
// biometrics.showBiometricPrompt("Please Verify").then(res => console.warn(res)).catch(err => console.warn(err));

// const eventEmitter = new NativeEventEmitter();

// eventEmitter.addListener('test', (params) => console.warn(params, 'hello'));

AppRegistry.registerComponent(appName, () => App);
