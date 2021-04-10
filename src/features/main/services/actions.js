import constants from './constants';
import { alertActions } from '../../alert';
import queries from './queries';
import { getTransactions } from '../../services';
import { getTransactions as getTransactionsX } from '../../../global';

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

function checkTransactionX({ accId, ignoreSsl, checkType = 'MULTI' }) {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const transaction = await getTransactionsX({
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

function checkTransaction({ accId, ignoreSSL, checkType = 'MULTI' }) {
    return async (dispatch) => {
        dispatch(alertActions.request());
        try {
            const { success, message, ...result } = await getTransactions({
                accId,
                ignoreSSL
            });
            if (success) {
                if (checkType === 'MULTI') {
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
                } else if (checkType === 'SELECTED') {
                    result?.transaction
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

const actions = {
    getAllAccounts,
    selectAccount,
    checkTransaction,
    checkTransactionX
};

export default actions;
