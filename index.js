import {
    AppRegistry,
    NativeEventEmitter,
    NativeModules,
    Platform
} from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { utilities } from './src/native-services';

//to prevent screenshot on Android Devices
Platform.OS === 'android' && utilities.preventScreenshot();



AppRegistry.registerComponent(appName, () => App);
