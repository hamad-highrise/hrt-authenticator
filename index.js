import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { biometrics, utilities } from './src/native-services';


// utilities.preventScreenshot();
// biometrics.showBiometricPrompt("Please Verify").then(res => console.warn(res)).catch(err => console.warn(err));

AppRegistry.registerComponent(appName, () => App);
