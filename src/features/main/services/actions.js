import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';
import { services } from '../../../global';
import { TokenError } from '../../../global/errors';

function getAllAccounts() {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const accounts = await queries.getAll();
            dispatch({ type: constants.INIT, payload: { accounts } });
            dispatch(alertActions.success());
        } catch (error) {
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
                              transaction: {
                                  available: true,
                                  ...transaction
                              }
                          }
                      })
                    : dispatch({
                          type: constants.SET_SELECTED_ACCOUNT_TRANSACTION,
                          payload: {
                              transaction: {
                                  available: false
                              }
                          }
                      });
            }
            dispatch(resetError({ accId }));
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(setError({ accId, error }));
            dispatch(alertActions.failure(error));
        }
    };
}

function setError({ error, accId }) {
    return {
        type: constants.SET_ERROR,
        payload: { accId, error }
    };
}

function resetError({ accId }) {
    return {
        type: constants.RESET_ERROR,
        payload: { accId }
    };
}

const actions = {
    getAllAccounts,
    selectAccount,
    checkTransaction,
    setError,
    resetError
};

export default actions;
