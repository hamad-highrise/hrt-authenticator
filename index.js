import 'react-native-gesture-handler';
import { AppRegistry, NativeModules } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { utilities } from './src/native-services';

NativeModules.RNCipher.encrypt({ keyAlias: 'ALI1', payload: 'Hello World' })
    // NativeModules.RNSecure.encrypt('hello world', 'test12')
    .then((res) => {
        console.warn(res);
        NativeModules.RNCipher.decrypt({
            keyAlias: 'ALI1',
            cipherText: res.cipherText
        })
            .then((res) => console.warn(res))
            .catch((err) => console.warn(err));
    })
    .catch((err) => console.warn(err));

// utilities.preventScreenshot();

AppRegistry.registerComponent(appName, () => App);
