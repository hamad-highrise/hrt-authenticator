import n from './src/navigation';
import { isInitiated } from './src/util/utilities';
import { cipher } from './src/util';

n.registerScreens();

(async () => {
    try {
        n.setRoot();
        (await isInitiated()) && n.setMainRoot();
    } catch (error) {
        console.warn(error);
        alert('Error initating app');
    }
})();
