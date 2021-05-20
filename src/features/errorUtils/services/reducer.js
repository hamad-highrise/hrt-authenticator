import constants from './constants';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD:
            return [
                ...state,
                { accId: action.payload.accId, error: action.payload.error }
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
