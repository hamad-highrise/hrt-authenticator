import RNFetchBlob from 'rn-fetch-blob';

function getInsecureFetch() {
    return RNFetchBlob.config({ trusty: true }).fetch;
}

export default getInsecureFetch;
