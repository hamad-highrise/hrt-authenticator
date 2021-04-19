import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../alert';
import { approveTransaction, denyTransaction } from '../services';
import navigator from '../../../navigation';

function useTransaction({ componentId }) {
    const selected = useSelector(({ main }) => main.selected);
    const { isConnected } = useSelector(({ alert }) => alert);
    const dispatch = useDispatch();
    let transaction;
    if (selected?.transaction?.available) {
        transaction = selected.transaction;
    }

    const onApprove = async () => {
        !isConnected && navigator.goToRoot(componentId);
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
            navigator.goToRoot(componentId);
        }
    };

    const onReject = async () => {
        !isConnected && navigator.goToRoot(componentId);
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
            navigator.goToRoot(componentId);
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
