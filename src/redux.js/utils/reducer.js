import constants from './constants';

const initialState = { loading: false, error: false, isConnected: false };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.REQUEST:
            return {
                ...state,
                loading: true
            };
        case constants.SUCCESS:
            return {
                ...state,
                loading: false
            };
        case constants.FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case constants.NETWORK_STATE_UPDATE:
            return {
                ...state,
                isConnected: action.payload.newtorkState
            };
        default:
            return state;
    }
}
