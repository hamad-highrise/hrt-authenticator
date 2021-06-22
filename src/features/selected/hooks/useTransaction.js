import { useEffect, useMemo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { hooks, constants } from '../../../global';
import screensIdentifiers from '../../../navigation/screensId';
import { transactionActions } from '../../actions.public';

const { useSelected, useUtils } = hooks;

function useTransaction() {
    const { transactions } = useSelector((state) => state);
    const { id: accId, type, ignoreSsl } = useSelected();
    const { isConnected } = useUtils();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const intervalRef = useRef();

    const transaction = useMemo(() => {
        const transaction = transactions.find(
            (transaction) => transaction['accId'] === accId
        );
        return transaction?.transactionData;
    }, [JSON.stringify(transactions)]);

    useEffect(() => {
        type === constants.ACCOUNT_TYPES.SAM &&
            (intervalRef.current = setInterval(transactionCheck, 2 * 1000));
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        type === constants.ACCOUNT_TYPES.SAM &&
            transaction &&
            navigation.navigate(screensIdentifiers.authTransaction);
    }, [JSON.stringify(transactions)]);

    const transactionCheck = () => {
        isConnected &&
            dispatch(transactionActions.checkTransaction({ accId, ignoreSsl }));
    };

    return transactionCheck;
}

export default useTransaction;
