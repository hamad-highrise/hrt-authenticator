import native from './native';

async function encrypt({ keyAlias, payload }) {
    try {
        const { cipherText } = await native.encrypt({ keyAlias, payload });
        return Promise.resolve({ cipherText });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function decrypt({ keyAlias, cipherText }) {
    try {
        const { decrypted } = await native.decrypt({ keyAlias, cipherText });
        return Promise.resolve({
            decrypted: decrypted.trim() /* trim will remove any padding added */
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { encrypt, decrypt };
export { encrypt, decrypt };
