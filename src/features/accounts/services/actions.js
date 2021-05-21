import { utilsActions } from '../../utils';
import services from './queries';
import constants from './constants';

function initiateAccounts() {
    return async (dispatch) => {
        dispatch(utilsActions.request());
        //fetch all accounts
        try {
            const accounts = await services.getAll();
            dispatch({ type: constants.INITIATE, payload: { accounts } });
            dispatch(utilsActions.success());
        } catch (error) {
            dispatch(utilsActions.failure());
        }
    };
}

function addAccount(newAccount) {
    return (dispatch) =>
        dispatch({ type: constants.CREATE, payload: { newAccount } });
}

function removeAccount(accId) {
    return (dispatch) =>
        dispatch({ type: constants.REMOVE, payload: { accId } });
}

export default { initiateAccounts, addAccount, removeAccount };
