import constants from './constants';

const initialState = {
    accounts: [],
    selected: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.INIT:
            return {
                selected: {},
                accounts: action.payload.accounts
            };
        case constants.SELECT_ACCOUNT:
            return {
                ...state,
                selected: state.accounts.find(
                    (account) => account['id'] === action.payload.accId
                )
            };
        case constants.UNSELECT_ACCOUNT:
            return {
                ...state,
                selected: {}
            };
        default:
            return state;
    }
};

export default reducer;
