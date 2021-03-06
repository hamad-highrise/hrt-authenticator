import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { accountActions } from '../ducks';
import { transactionActions } from '../../actions.public';
import constants from '../../../global/constants';
import screensIdentifiers from '../../../navigation/screensId';

function useAccounts() {
    const accounts = useSelector(({ accounts }) => accounts);
    const { isConnected } = useSelector(({ utils }) => utils);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const intervalRef = useRef();

    useEffect(() => {
        loadAccounts();
        navigation.dispatch((state) => {
            const routes = state.routes.filter(
                (r) => r.name != screensIdentifiers.splash
            );

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1
            });
        });
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                BackHandler.exitApp();
                return true;
            }
        );
        return () => {
            clearInterval(intervalRef.current);
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        intervalRef.current && clearInterval(intervalRef.current);
        if (accounts?.length > 0)
            intervalRef.current = setInterval(transactionChecker, 1000 * 5);
    }, [JSON.stringify(accounts)]);

    const transactionChecker = () => {
        accounts.forEach((account) => {
            account['type'] === constants.ACCOUNT_TYPES.SAM &&
                dispatch(
                    transactionActions.checkTransaction({
                        accId: account['id'],
                        ignoreSsl: account['ignoreSsl']
                    })
                );
        });
    };

    const loadAccounts = () => {
        dispatch(accountActions.initiateAccounts());
    };

    return { accounts, isConnected };
}

export default useAccounts;
