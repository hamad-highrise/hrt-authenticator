import RNFetchBlob from 'rn-fetch-blob';

function getFetchInstance({ secure = true } = {}) {
    return RNFetchBlob.config({ trusty: true }).fetch;
}

export default getFetchInstance;
export { getFetchInstance };
