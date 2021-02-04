async function addAcount({
    name,
    issuer,
    secret,
    digits = 6,
    period = 30,
    algorithm = 'SHA1',
    ignoreSSL = false
}) {
    try {
        //resolve
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
