import actions from '../../alert/action';
import constants from './constants';

const initialState = {
    accounts: [],
    selected: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOAD_ALL:
            // console.warn(action.payload, 'payload');
            return {
                ...state,
                accounts: action.payload.accounts
            };
        case constants.SELECT_ACCOUNT:
            return {
                ...state,
                selected: action.payload.account
            };
        default:
            return state;
    }
};

export default reducer;
