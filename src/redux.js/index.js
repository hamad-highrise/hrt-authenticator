import { applyMiddleware, combineReducers, createStore } from 'redux';

import { accountsReducer } from '../features/index.reducers';
import { utilsReducer, utilsActions } from './utils';

// import { alertReducer } from '../features/alert';
// import { mainReducer } from '../features/index.reducers';
import thunk from 'redux-thunk';
// const rootReducer = combineReducers({ alert: alertReducer, main: mainReducer });
const rootReducer = combineReducers({
    accounts: accountsReducer,
    utils: utilsReducer
});

// const initialState = {
//     main: {
//         selected: {},
//         accounts: null
//     },
//     alert: {
//         isConnected: null,
//         loading: false,
//         error: {
//             hasOccurred: false,
//             data: {}
//         }
//     }
// };

const initialState = {
    accounts: null,
    // transaction: [],
    // errors: [],
    utils: { loading: false, error: false, isConnected: null }
};

export default createStore(rootReducer, initialState, applyMiddleware(thunk));
export { utilsActions };
