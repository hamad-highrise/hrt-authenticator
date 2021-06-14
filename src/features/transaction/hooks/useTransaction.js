import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { transactionActions } from '../ducks';
import { hooks } from '../../../global';
import screensIdentifiers from '../../../navigation/screensId';

const { useSelected, useUtils } = hooks;

function useTransaction() {
    const { transactions } = useSelector((state) => state);
    const { isConnected, loading } = useUtils();
    const { id: accId, ignoreSsl } = useSelected();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const accTransaction = useMemo(() => {
        let transaction = transactions.find(
            (transaction) => transaction['accId'] === accId
        );
        return transaction?.transactionData;
    }, [JSON.stringify(transactions)]);

    const onApprove = async () => {
        dispatch(
            transactionActions.approveTransaction({
                accId,
                endpoint: accTransaction.requestUrl,
                ignoreSsl
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
                accId,
                endpoint: accTransaction.requestUrl,
                ignoreSsl
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
