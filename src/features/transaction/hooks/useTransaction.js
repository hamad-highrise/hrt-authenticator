import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { transactionActions } from '../services';

function useTransaction() {
    const transactions = useSelector(({ transactions }) => transactions);
    const navigation = useNavigation();
    const { isConnected, loading } = useSelector(({ utils }) => utils);
    const dispatch = useDispatch();
    let transaction;
    if (selected?.transaction?.available) {
        transaction = transactions.filter(transaction);
    }

    const onApprove = async () => {
        dispatch(
            transactionActions.approveTransaction({
                accId,
                endpoint: transaction.requestUrl,
                ignoreSsl
            })
        );
        !loading && navigation.goBack();
    };

    const onReject = async () => {
        dispatch(
            transactionActions.denyTransaction({
                accId,
                endpoint: transaction.requestUrl,
                ignoreSsl
            })
        );
        !loading && navigation.goBack();
    };

    return {
        onApprove,
        onReject,
        message: transaction.displayMessage,
        createdAt: transaction.createdAt,
        transactionId: transaction.transactionId,
        isConnected,
        loading
    };
}

export default useTransaction;
