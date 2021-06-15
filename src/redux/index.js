import { applyMiddleware, combineReducers, createStore } from 'redux';

import {
    accountsReducer,
    errReducer,
    transactionReducer,
    utilsReducer,
    selectReducer
} from '../features/index.reducers';
import errorActionTypes from '../features/errorUtils/services/constants';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    accounts: accountsReducer,
    utils: utilsReducer,
    errors: errReducer,
    transactions: transactionReducer,
    selected: selectReducer
});

const initialState = {
    accounts: null,
    transactions: [],
    errors: [],
    utils: { loading: false, error: false, isConnected: null },
    selected: {}
};

const errorMiddlware = (store) => (next) => (action) => {
    if (action.type === errorActionTypes.ADD) {
        const { errors } = store.getState();

        return errors.filter(
            (e) =>
                e.accId === action.payload.accId &&
                e.error.name === action.payload.error.name
        ).length > 0
            ? null
            : next(action);
    } else return next(action);
};

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(errorMiddlware, thunk)
);
