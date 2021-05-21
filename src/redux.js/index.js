import { applyMiddleware, combineReducers, createStore } from 'redux';

import {
    accountsReducer,
    errReducer,
    transactionReducer
} from '../features/index.reducers';
import { utilsReducer, utilsActions } from './utils';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    accounts: accountsReducer,
    utils: utilsReducer,
    errors: errReducer,
    transactions: transactionReducer
});

const initialState = {
    accounts: null,
    transactions: [],
    errors: [],
    utils: { loading: false, error: false, isConnected: null }
};

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        (store) => (next) => (action) => {
            const { errors } = store.getState();
            next(action);
            // return;
        },
        thunk
    )
);
export { utilsActions };
