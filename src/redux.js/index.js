import { applyMiddleware, combineReducers, createStore } from 'redux';

import { accountsReducer } from '../features/index.reducers';
import { utilsReducer, utilsActions } from './utils';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    accounts: accountsReducer,
    utils: utilsReducer
});

const initialState = {
    accounts: null,
    // transaction: [],
    // errors: [],
    utils: { loading: false, error: false, isConnected: null }
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk));
export { utilsActions };
