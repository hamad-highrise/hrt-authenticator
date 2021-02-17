import n from './src/navigation';
import { isInitiated } from './src/util/utilities';
n.registerScreens();

(async () => {
    try {
        n.setRoot();
        (await isInitiated()) && n.setMainRoot();
    } catch (error) {
        alert('Error initating app');
    }
})();
