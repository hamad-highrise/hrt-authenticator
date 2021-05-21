import constants from './constants';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD:
            const errIndex = state.findIndex(
                (error) => error.accId === action.payload.accId
            );
            return [
                ...state.slice(0, errIndex),
                { accId: action.payload.accId, error: action.payload.error },
                ...state.slice(errIndex + 1)
            ];
        case constants.CLEAR:
            return [
                ...state.filter((error) => error.accId !== action.payload.accId)
            ];
        case constants.CLEAR_ALL:
            return [];
        default:
            return state;
    }
}
