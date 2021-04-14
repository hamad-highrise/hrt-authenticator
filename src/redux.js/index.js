import { applyMiddleware, combineReducers, createStore } from 'redux';
import { alertReducer } from '../features/alert';
import { mainReducer } from '../features/index.reducers';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({ alert: alertReducer, main: mainReducer });

const initialState = {
    main: {
        selected: {},
        accounts: null
    },
    alert: {
        isConnected: true,
        loading: false,
        error: {
            hasOccurred: false,
            data: {}
        }
    }
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk));
