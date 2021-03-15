import n from './src/navigation';
import { isInitiated } from './src/util/utilities';
import { push } from './src/util';
import { NativeModules } from 'react-native';
n.registerScreens();

(async () => {
    try {
        n.setRoot();
        (await isInitiated()) && n.setMainRoot();
        const { RNCipher } = NativeModules;
        const payload =
            'HamadSafdar';
        const alias = 'KEY_SECRET_ALIAS';

        const { encrypted, iv } = await RNCipher.encrypt({
            keyAlias: alias,
            payload
        });
        console.warn('Encrypted', encrypted);
        console.warn('IV', iv);
        const { decrypted } = await RNCipher.decrypt({
            keyAlias: alias,
            encrypted,
            iv
        });
        console.warn('Decrypted', decrypted.trim());
    } catch (error) {
        console.warn(error);
        alert('Error initating app');
    }
})();
