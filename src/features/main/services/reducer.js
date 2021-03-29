import constants from './constants';

const initialState = {
    allAccounts: [{ name: '', issuer: '', ignoreSSL: true }],
    selected: { name: '', issuer: '', ignoreSSL: true }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOAD_ALL:
            return {
                ...state,
                allAccounts: action.payload.accounts
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
