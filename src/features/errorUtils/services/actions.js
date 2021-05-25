import constants from './constants';

function add({ accId, error }) {
    return { type: constants.ADD, payload: { accId, error } };
}

function clear(accId) {
    return { type: constants.CLEAR, payload: { accId } };
}

function clearAll() {
    return { type: constants.CLEAR_ALL };
}

export default { add, clear, clearAll };
export { add, clear, clearAll };
