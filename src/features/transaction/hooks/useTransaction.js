import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { transactionActions } from '../services';
import { useMemo } from 'react';
import screensIdentifiers from '../../../navigation/screensId';

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

    const onApprove = async () => {
        dispatch(
            transactionActions.approveTransaction({
                accId: selected['id'],
                endpoint: accTransaction.requestUrl,
                ignoreSsl: selected['ignoreSsl']
            })
        )
            .then(() =>
                navigation.navigate(screensIdentifiers.transactionResponse, {
                    approve: true,
                    success: true
                })
            )
            .catch((error) =>
                navigation.navigate(screensIdentifiers.transactionError, {
                    message: error.displayMessage
                })
            );
    };

    const onReject = async () => {
        dispatch(
            transactionActions.denyTransaction({
                accId: selected['id'],
                endpoint: accTransaction.requestUrl,
                ignoreSsl: selected['ignoreSsl']
            })
        )
            .then(() =>
                navigation.navigate(screensIdentifiers.transactionResponse, {
                    approve: false,
                    success: true
                })
            )
            .catch((error) =>
                navigation.navigate(screensIdentifiers.transactionError, {
                    message: error.displayMessage
                })
            );
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
