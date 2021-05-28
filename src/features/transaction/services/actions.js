import constants from './constants';
import { errActions } from '../../errorUtils';
import { services } from '../../../global';
import { utilsActions } from '../../utils';
import {
    approveTransaction as approve,
    denyTransaction as deny
} from '../../authTransaction/services';

const { getTransactions } = services;

function checkTransaction({ accId, ignoreSsl }) {
    return async (dispatch) => {
        try {
            const transaction = await getTransactions({ accId, ignoreSsl });
            transaction
                ? dispatch({
                      type: constants.ADD_TRANSACTION,
                      payload: { accId, transaction }
                  })
                : dispatch({ type: constants.CLEAR, payload: { accId } });
            dispatch(errActions.clear(accId));
        } catch (error) {
            dispatch(errActions.add({ accId, error }));
        }
    };
}

function approveTransaction({ accId, endpoint, ignoreSsl }) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch(utilsActions.request());
            approve({ accId, endpoint, ignoreSsl })
                .then(() => {
                    dispatch(utilsActions.success());
                    dispatch({ type: constants.CLEAR, payload: { accId } });
                    resolve();
                })
                .catch((err) => {
                    dispatch(utilsActions.failure());
                    dispatch(errActions.add({ accId, error }));
                    reject(err);
                });
        });
}

function denyTransaction({ accId, endpoint, ignoreSsl }) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch(utilsActions.request());
            deny({ accId, endpoint, ignoreSsl })
                .then(() => {
                    dispatch(utilsActions.success());
                    dispatch({ type: constants.CLEAR, payload: { accId } });
                    resolve();
                })
                .catch((err) => {
                    dispatch(utilsActions.failure());
                    dispatch(errActions.add({ accId, error }));
                    reject(err);
                });
        });
}

export default { checkTransaction, approveTransaction, denyTransaction };
export { checkTransaction, approveTransaction, denyTransaction };
