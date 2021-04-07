/**
 * Evaluate a token and returns a boolean if a token has expired or not.
 * @param {Number} expiresAt - Epoch Time (in seconds) at which token expires
 * @returns Boolean expressing if a token is valid till now.
 */

function isTokenValid(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    return expiresAt > currentTime && expiresAt - currentTime > 5;
}

/**
 * Converts given seconds duration to Epoch time(in seconds)
 * @param {Number} expiresIn - Duration for which token is valid.
 * @returns  Epoch time (in  seconds) at which token will expire
 */

function getTokenExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

export default { getTokenExpiryInSeconds, isTokenValid };
export { getTokenExpiryInSeconds, isTokenValid };
