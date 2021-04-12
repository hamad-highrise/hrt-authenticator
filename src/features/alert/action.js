import constants from './constants';

const request = () => ({ type: constants.REQUEST });
const success = () => ({ type: constants.SUCCESS });
const failure = (error) => ({ type: constants.FAILURE, payload: error });
const reset = () => ({ type: constants.RESET });

const actions = { request, success, failure, reset };
export default actions;
