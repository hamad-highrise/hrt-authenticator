import constants from './constants';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.INITIATE:
            return action.payload.accounts;
        case constants.CREATE:
            return [...state, action.payload.newAccount];
        case constants.REMOVE:
            const removeAccountIndex = state.findIndex(
                (account) => account['id'] === action.payload.accId
            );
            return [
                ...state.slice(0, removeAccountIndex),
                ...state(removeAccountIndex + 1)
            ];
        default:
            return state;
    }
}
