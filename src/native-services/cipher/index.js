import native from './native';

async function encrypt({ keyAlias, payload }) {
    try {
        const { encrypted, iv } = await native.encrypt({ keyAlias, payload });
        return Promise.resolve({ encrypted, iv });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function decrypt({ keyAlias, encrypted, iv }) {
    try {
        const { decrypted } = await native.decrypt({ keyAlias, encrypted, iv });
        return Promise.resolve({
            decrypted: decrypted.trim() /* trim will remove any padding added */
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { encrypt, decrypt };
export { encrypt, decrypt };
