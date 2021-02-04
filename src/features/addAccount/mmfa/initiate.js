//TODO: Check if valid object

async function initiate(scanned) {
    const resultObj = { message: 'OKAY' };
    const isValidMmfaObj =
        scanned?.code && scanned?.details_url && scanned?.options;
    if (!isValidMmfaObj) {
        resultObj.message = 'INVALID_MMFA_OBJECT';
        return resultObj;
    }
    const detailsResult = await getDetails(scanned.details_url);
    if (!detailsResult.respInfo.status === '200') {
        resultObj.message === 'ERROR_FETCHING_DETAILS';
        return resultObj;
    }
    const tokenResult = await getToken('endpoint', 'data');
    if (!detailsResult.respInfo.status === '200') {
        resultObj.message === 'ERROR_FETCHING_TOKEN';
        return resultObj;
    }
}

function getMethods(mechanisims) {}

async function getDetails(endpoint) {}

async function getToken(endpoint, data) {}
