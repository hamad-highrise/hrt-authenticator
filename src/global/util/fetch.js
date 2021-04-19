import RNFetchBlob from 'rn-fetch-blob';

/**
 * Gives the instance of **rn-fetch-blob** with given config options.
 * @param {Boolean} ignoreSsl - **CAUTIONS**: If true, fetch will ignore self-signed certificates errors.
 * @returns Fetch instance
 */

function getFetchInstance({ ignoreSsl = true } = {}) {
    ignoreSsl = Boolean(ignoreSsl);
    return RNFetchBlob.config({
        trusty: ignoreSsl /* workaround until refactored completely */
    }).fetch;
}

export default getFetchInstance;
export { getFetchInstance };
