import n from './src/navigation';
import { isInitiated } from './src/native-services/utilities';
import NetInfo from '@react-native-community/netinfo';
import store from './src/redux.js';
import { alertActions } from './src/features/alert';

n.registerScreens();

NetInfo.fetch()
    .then((state) =>
        store.dispatch(alertActions.netStateChanged(state.isConnected))
    )
    .catch((err) => store.dispatch(alertActions.failure(err)));

NetInfo.addEventListener((status) => {
    store.dispatch(alertActions.netStateChanged(status.isConnected));
});

(async () => {
    try {
        n.setRoot();
        (await isInitiated()) && n.setMainRoot();
    } catch (error) {
        console.warn(error);
        alert('Error initating app');
    }
})();
