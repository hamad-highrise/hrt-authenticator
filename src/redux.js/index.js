import { createStore } from 'redux';

const initialState = {
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
};
