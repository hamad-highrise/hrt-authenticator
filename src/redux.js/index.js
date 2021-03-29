import { combineReducers, createStore } from 'redux';
import { alertReducer } from '../features/alert';

const rootReducer = combineReducers({ alert: alertReducer });

const initialState = {
    main: {
        selected: {
            account: {},
            options: {},
            secret: ''
        },
        accounts: [
            {
                id: 0,
                name: 'Test Account',
                issuer: 'Test Issuer',
                type: 'SAM'
            },
            {
                id: 1,
                name: 'Test Account 1',
                issuer: 'Test Issuer 1',
                type: 'SAM'
            }
        ]
    },
    alert: {
        loading: false,
        error: {
            isOccurred: false,
            data: {}
        }
    }
};
