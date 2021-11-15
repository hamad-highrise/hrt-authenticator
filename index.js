import {
    AppRegistry,
    Linking,
    NativeEventEmitter,
    NativeModules,
    Platform
} from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { push, utilities } from './src/native-services';

//to prevent screenshot on Android Devices
Platform.OS === 'android' && utilities.preventScreenshot();

const event = new NativeEventEmitter();
const sub = event.addListener('transaction', (res) => {
    Linking.openURL('verify://');
});

setTimeout(() => {
    push.getFirebaseToken().then(console.warn).catch(console.warn);
}, 5000);

AppRegistry.registerComponent(appName, () => App);
