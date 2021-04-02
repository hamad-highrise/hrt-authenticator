import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';
import { getTransactions } from '../../services';

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

function checkTransaction({ accId, ignoreSSL }) {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const { success, message, ...result } = await getTransactions({
                accId,
                ignoreSSL
            });
            if (success) {
                result?.transaction
                    ? dispatch({
                          type: constants.SET_TRANSACTION,
                          payload: {
                              accId,
                              transaction: {
                                  available: true,
                                  ...result.transaction
                              }
                          }
                      })
                    : dispatch({
                          type: constants.SET_TRANSACTION,
                          payload: {
                              accId,
                              transaction: { available: false }
                          }
                      });
            }

            dispatch(alertActions.success());
        } catch (error) {
            dispatch({
                type: constants.SET_TRANSACTION,
                payload: { accId, transaction: { available: false } }
            });
            dispatch(alertActions.failure());
        }
    };
}

const actions = { getAllAccounts, selectAccount, checkTransaction };

export default actions;
