import constants from './constants';

const request = () => ({ type: constants.REQUEST });
const success = () => ({ type: constants.SUCCESS });
const failure = (error) => ({ type: constants.FAILURE, payload: error });
const reset = () => ({ type: constants.RESET });
const netStateChanged = (isConnected) => ({
    type: constants.NET_STATE,
    payload: { isConnected }
});

const actions = { request, success, failure, reset, netStateChanged };
export default actions;
