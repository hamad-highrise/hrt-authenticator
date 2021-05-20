import constants from './constants';
import { errActions } from '../../errorUtils';
import { services } from '../../../global';

const { getTransactions } = services;

function checkTransaction({ accId, ignoreSsl }) {
    return async (dispatch) => {
        try {
            const transaction = await getTransactions({ accId, ignoreSsl });
            transaction &&
                dispatch({
                    type: constants.ADD_TRANSACTION,
                    payload: { accId, transaction }
                });
            dispatch(errActions.clear(accId));
        } catch (error) {
            dispatch(errActions.add({ accId, error }));
        }
    };
}

function approveTransaction(accId) {}

function denyTransaction() {}

export default { checkTransaction, approveTransaction, denyTransaction };
