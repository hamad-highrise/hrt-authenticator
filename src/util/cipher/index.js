import native from './native';

async function encrypt({ keyAlias, payload }) {
    try {
        const { encrypted, iv } = await native.encrypt({ keyAlias, payload });
        return Promise.resolve({ encrypted, iv });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function decrypt({keyAlias, encrypted, iv}){
    
}
