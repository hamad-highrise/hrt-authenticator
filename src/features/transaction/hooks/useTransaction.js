import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { transactionActions } from '../services';
import { useEffect, useMemo } from 'react';

function useTransaction() {
    const {
        transactions,
        utils: { isConnected, loading },
        selected
    } = useSelector((state) => state);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const accTransaction = useMemo(() => {
        let transaction = transactions.find(
            (transaction) => transaction['accId'] === selected['id']
        );
        return transaction?.transactionData;
    }, [JSON.stringify(transactions)]);

    useEffect(() => {
        !accTransaction && navigation.goBack();
    }, [JSON.stringify(accTransaction)]);

    const onApprove = async () => {
        dispatch(
            transactionActions.approveTransaction({
                accId: selected['id'],
                endpoint: accTransaction.requestUrl,
                ignoreSsl: selected['ignoreSsl']
            })
        );
        !loading && navigation.goBack();
    };

    const onReject = async () => {
        dispatch(
            transactionActions.denyTransaction({
                accId: selected['id'],
                endpoint: accTransaction.requestUrl,
                ignoreSsl: selected['ignoreSsl']
            })
        );
        !loading && navigation.goBack();
    };

    return {
        onApprove,
        onReject,
        message: accTransaction?.displayMessage,
        createdAt: accTransaction?.createdAt,
        transactionId: accTransaction?.transactionId,
        isConnected,
        loading
    };
}

export default useTransaction;
