import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { alertActions } from '../../alert';
import { approveTransaction, denyTransaction } from '../services';

function useTransaction() {
    const selected = useSelector(({ main }) => main.selected);
    const navigation = useNavigation();
    const { isConnected } = useSelector(({ alert }) => alert);
    const dispatch = useDispatch();
    let transaction;
    if (selected?.transaction?.available) {
        transaction = selected.transaction;
    }

    const onApprove = async () => {
        try {
            dispatch(alertActions.request());
            await approveTransaction({
                accId: selected['id'],
                endpoint: transaction.requestUrl
            });
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        } finally {
            navigation.goBack();
        }
    };

    const onReject = async () => {
        try {
            dispatch(alertActions.request());
            await denyTransaction({
                accId: selected['id'],
                endpoint: transaction.requestUrl
            });
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        } finally {
            navigation.goBack();
        }
    };

    return {
        onApprove,
        onReject,
        message: transaction.displayMessage,
        createdAt: transaction.createdAt,
        transactionId: transaction.transactionId,
        isConnected
    };
}

export default useTransaction;
