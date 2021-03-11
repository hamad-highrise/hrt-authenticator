import n from './src/navigation';
import { isInitiated } from './src/util/utilities';
import { push } from './src/util';
n.registerScreens();

(async () => {
    try {
        n.setRoot();
        (await isInitiated()) && n.setMainRoot();
        // const { pushToken } = await push.getFirebaseToken();
        // console.warn(pushToken);
    } catch (error) {
        alert('Error initating app');
    }
})();
