import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../alert';
import { authTransaction, rejectTransaction } from '../services';
import navigator from '../../../navigation';

function useTransaction({ componentId }) {
    const selected = useSelector(({ main }) => main.selected);
    const dispatch = useDispatch();
    let transaction;
    if (selected?.transaction?.available) {
        transaction = selected.transaction;
        console.warn(transaction);
    }

    const onApprove = async () => {
        try {
            dispatch(alertActions.request());
            await authTransaction({
                accId: selected['id'],
                tEndpoint: transaction.requestUrl
            });
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        } finally {
            navigator.goToRoot(componentId);
        }
    };

    const onReject = async () => {
        try {
            dispatch(alertActions.request());
            await rejectTransaction({
                accId: selected['id'],
                tEndpoint: transaction.requestUrl
            });
            dispatch(alertActions.success());
        } catch (error) {
            dispatch(alertActions.failure(error));
        }
    };

    return {
        onApprove,
        onReject,
        message: transaction.displayMessage,
        createdAt: transaction.createdAt,
        transactionId: transaction.transactionId
    };
}

export default useTransaction;
