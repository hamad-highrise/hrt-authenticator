import { useEffect, useRef } from 'react';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { mainActions } from '../services';
import navigator from '../../../navigation';
import constants from '../../../global/constants';

const CHECKTYPE = 'MULTI';

function useAccounts() {
    const accounts = useSelector(({ main }) => main.accounts);
    const dispatch = useDispatch();
    const transactionCheckIntervalRef = useRef();

    useEffect(() => {
        loadAccounts();
        const appearListener = Navigation.events().registerComponentDidAppearListener(
            ({ componentName }) => {
                componentName === navigator.screenIds.main && loadAccounts();
            }
        );
        return () => {
            clearInterval(transactionCheckIntervalRef.current);
            appearListener.remove();
        };
    }, []);

    useEffect(() => {
        transactionCheckIntervalRef.current &&
            clearInterval(transactionCheckIntervalRef.current);
        if (accounts.length > 0)
            transactionCheckIntervalRef.current = setInterval(
                transactionChecker,
                1000 * 5
            );
    }, [accounts.length]);

    const transactionChecker = () => {
        accounts.forEach((account) => {
            account['type'] === constants.ACCOUNT_TYPES.SAM &&
                dispatch(
                    mainActions.checkTransaction({
                        accId: account['id'],
                        checkType: CHECKTYPE
                    })
                );
        });
    };

    const loadAccounts = () => {
        dispatch(mainActions.getAllAccounts());
    };

    return { accounts };
}

export default useAccounts;
