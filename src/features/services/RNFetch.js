import RNFetchBlob from 'rn-fetch-blob';

function getFetchInstance({ ignoreSSL = true } = {}) {
    return RNFetchBlob.config({
        trusty: true /* workaround until refactored completely */
    }).fetch;
}

export default getFetchInstance;
export { getFetchInstance };
