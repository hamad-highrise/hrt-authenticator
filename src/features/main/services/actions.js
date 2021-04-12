import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';
import { services } from '../../../global';

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

function checkTransaction({ accId, ignoreSsl, checkType = 'MULTI' }) {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const transaction = await services.getTransactions({
                accId,
                ignoreSsl
            });
            if (checkType === 'MULTI') {
                transaction
                    ? dispatch({
                          type: constants.SET_TRANSACTION,
                          payload: {
                              accId,
                              transaction: {
                                  available: true,
                                  ...transaction
                              }
                          }
                      })
                    : dispatch({
                          type: constants.SET_TRANSACTION,
                          payload: {
                              accId,
                              transaction: {
                                  available: false
                              }
                          }
                      });
            } else if (checkType === 'SELECTED') {
                transaction
                    ? dispatch({
                          type: constants.SET_SELECTED_ACCOUNT_TRANSACTION,
                          payload: {
                              accId,
                              transaction: {
                                  available: true,
                                  ...result.transaction
                              }
                          }
                      })
                    : dispatch({
                          type: constants.SET_SELECTED_ACCOUNT_TRANSACTION,
                          payload: {
                              accId,
                              transaction: {
                                  available: false
                              }
                          }
                      });
            }
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        }
    };
}

const actions = {
    getAllAccounts,
    selectAccount,
    checkTransaction
};

export default actions;
