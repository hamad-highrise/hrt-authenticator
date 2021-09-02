import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { utilities } from './src/native-services';

// utilities.preventScreenshot();

AppRegistry.registerComponent(appName, () => App);
