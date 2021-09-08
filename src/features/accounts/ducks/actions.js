import { utilsActions } from '../../utils';
import { queries } from '../services';
import constants from './constants';
// import { services } from '../../../global';
// import { errActions } from '../../errorUtils';

function initiateAccounts() {
    return async (dispatch) => {
        dispatch(utilsActions.request());
        //fetch all accounts
        try {
            const accounts = await queries.getAll();
            dispatch({ type: constants.INITIATE, payload: { accounts } });
            dispatch(utilsActions.success());
        } catch (error) {
            console.warn(error, 'test');
            dispatch(utilsActions.failure());
        }
    };
}

function addAccount(newAccount) {
    return (dispatch) =>
        dispatch({ type: constants.CREATE, payload: { newAccount } });
}

function removeAccount(accId) {
    return { type: constants.REMOVE, payload: { accId } };
}

export default { initiateAccounts, addAccount, removeAccount };
