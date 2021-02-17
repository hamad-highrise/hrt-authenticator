import n from './src/navigation';
import { isInitialStart } from './src/util/utilities';
n.registerScreens();

(async () => {
    try {
        n.setRoot();
        (await isInitialStart()).initiated && n.setMainRoot();
    } catch (error) {
        alert('Error initating app');
    }
})();
