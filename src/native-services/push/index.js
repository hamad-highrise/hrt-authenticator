import native from './native';

async function getFirebaseToken() {
    try {
        const { pushToken } = await native.getFirebaseToken();
        return Promise.resolve({ pushToken });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getFirebaseToken };
export { getFirebaseToken };
