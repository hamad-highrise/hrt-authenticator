import 'react-native-gesture-handler';
import { AppRegistry, NativeEventEmitter } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { push, utilities } from './src/native-services';

// setTimeout(() => {
//     push.getFirebaseToken()
//     .then((token) => console.warn(token))
//     .catch((err) => console.warn(err));
// }, 5000);

// utilities.preventScreenshot();


AppRegistry.registerComponent(appName, () => App);
