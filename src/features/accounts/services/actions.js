import { utilsActions } from '../../utils';
import queries from './queries';
import constants from './constants';
import { services } from '../../../global';
import { errActions } from '../../errorUtils';

function initiateAccounts() {
    return async (dispatch) => {
        dispatch(utilsActions.request());
        //fetch all accounts
        try {
            const accounts = await queries.getAll();
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
    return { type: constants.REMOVE, payload: { accId } };
    // return (dispatch) =>
    //     new Promise((resolve, reject) => {
    //         dispatch(utilsActions.request());
    //         services
    //             .removeAccount({ accId, type, ignoreSsl })
    //             .then(() => {
    //                 dispatch(utilsActions.success());
    //                 dispatch({ type: constants.REMOVE, payload: { accId } });
    //                 resolve();
    //             })
    //             .catch((error) => {
    //                 dispatch(errActions.add({ accId, error }));
    //                 dispatch(utilsActions.failure());
    //                 reject(error);
    //             });
    //     });
}

export default { initiateAccounts, addAccount, removeAccount };
