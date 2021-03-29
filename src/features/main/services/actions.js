import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';

function getAllAccounts() {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const accounts = await queries.getAll();
            dispatch({ type: constants.LOAD_ALL, payload: accounts });
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        }
    };
}

function selectAccount() {
    return async (dispatch) => {};
}

const actions = { getAllAccounts, selectAccount };

export default actions;
