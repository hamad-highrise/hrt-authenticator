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
        case constants.SET_TRANSACTION:
            const index = state.accounts.findIndex(
                (account) => account['id'] === action.payload.accId
            );
            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, index),
                    {
                        ...state.accounts[index],
                        transaction: {
                            ...action.payload.transaction
                        }
                    },
                    ...state.accounts.slice(index + 1)
                ]
            };

        case constants.SET_SELECTED_ACCOUNT_TRANSACTION:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    transaction: { ...action.payload.transaction }
                }
            };

        case constants.SET_ERROR:
            const sIndex = state.accounts.findIndex(
                (account) => account['id'] === action.payload.accId
            );
            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, sIndex),
                    {
                        ...state.accounts[sIndex],
                        transaction: {
                            available: false
                        },
                        error: true
                    },
                    ...state.accounts.slice(sIndex + 1)
                ]
            };
        case constants.RESET_ERROR:
            const rIndex = state.accounts.findIndex(
                (account) => account['id'] === action.payload.accId
            );

            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, rIndex),
                    {
                        ...state?.accounts[rIndex],
                        transaction: {
                            ...state?.accounts[rIndex]?.transaction
                        },
                        error: false
                    },
                    ...state.accounts.slice(rIndex + 1)
                ]
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
