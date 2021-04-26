import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { mainActions } from '../services';
import constants from '../../../global/constants';

const CHECKTYPE = 'MULTI';

function useAccounts() {
    const accounts = useSelector(({ main }) => main.accounts);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const transactionCheckIntervalRef = useRef();

    useEffect(() => {
        loadAccounts();
        // const appearListener = Navigation.events().registerComponentDidAppearListener(
        //     ({ componentName }) => {
        //         componentName === navigator.screenIds.main && loadAccounts();
        //     }
        // );
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                BackHandler.exitApp();
                return true;
            }
        );
        return () => {
            clearInterval(transactionCheckIntervalRef.current);
            // appearListener.remove();
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        transactionCheckIntervalRef.current &&
            clearInterval(transactionCheckIntervalRef.current);
        if (accounts?.length > 0)
            transactionCheckIntervalRef.current = setInterval(
                transactionChecker,
                1000 * 5
            );
    }, [JSON.stringify(accounts)]);

    const transactionChecker = () => {
        accounts.forEach((account) => {
            account['type'] === constants.ACCOUNT_TYPES.SAM &&
                dispatch(
                    mainActions.checkTransaction({
                        accId: account['id'],
                        checkType: CHECKTYPE,
                        ignoreSsl: account['ignoreSsl']
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
