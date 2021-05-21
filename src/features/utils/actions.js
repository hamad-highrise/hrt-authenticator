import constants from './constants';

const request = () => ({ type: constants.REQUEST });

const success = () => ({ type: constants.SUCCESS });

const failure = () => ({ type: constants.FAILURE });

const newtorkStateUpdate = (networkState) => ({
    type: constants.NETWORK_STATE_UPDATE,
    payload: { networkState }
});

export default { request, success, failure, newtorkStateUpdate };
