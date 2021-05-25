import constants from './constants';

const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.SELECT:
            return action.payload.account;
        case constants.DESELECT:
            return {};
        default:
            return state;
    }
}
