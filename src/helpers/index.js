function checkQrValidity(data) {
    return data?.code && data?.details_url;
}

function getIgnoreSslOption(options) {
    const splitted = options?.split('=');
    return (
        (splitted?.shift() === 'ignoreSslCerts' &&
            splitted?.shift() == 'true') ??
        false
    );
}

function getTokenExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

function checkTokenExpiry(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    const TOKEN_EXPIRY_SECONDS_THRESHOLD = 5;
    const valid =
        expiresAt > currentTime &&
        expiresAt - currentTime > TOKEN_EXPIRY_SECONDS_THRESHOLD;
    return valid;
}

export default {
    checkQrValidity,
    getIgnoreSslOption,
    getTokenExpiryInSeconds,
    checkTokenExpiry
};
export {
    checkQrValidity,
    getIgnoreSslOption,
    getTokenExpiryInSeconds,
    checkTokenExpiry
};
