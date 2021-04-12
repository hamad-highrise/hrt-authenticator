import constants from './constants';

const initialState = {
    isConnected: true,
    loading: false,
    error: {
        hasOccurred: false,
        data: {}
    }
};

function reducer(state = initialState, action) {
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
                error: {
                    ...state.error,
                    hasOccurred: true,
                    data: action.payload
                }
            };
        case constants.RESET:
            return {
                loading: false,
                error: {
                    hasOccurred: false,
                    data: {}
                }
            };

        case constants.NET_STATE:
            return;
        default:
            return state;
    }
}

export default reducer;
