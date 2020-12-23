import { Navigation } from 'react-native-navigation';
import { MainScreen } from './src/screens';

// import App from './App';

Navigation.registerComponent('authenticator.MainScreen', () => MainScreen);

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
