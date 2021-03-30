import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';

function getAllAccounts() {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const accounts = await queries.getAll();
            dispatch({ type: constants.INIT, payload: { accounts } });
            dispatch(alertActions.success());
        } catch (error) {
            console.warn(error);
            dispatch(alertActions.failure(error));
        }
    };
}

function selectAccount(accId) {
    return {
        type: constants.SELECT_ACCOUNT,
        payload: { accId }
    };
}

const actions = { getAllAccounts, selectAccount };

export default actions;
