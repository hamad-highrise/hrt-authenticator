import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { mainActions } from '../services';
import constants from '../../../global/constants';
import screensIdentifiers from '../../../navigation/screensId';

const CHECKTYPE = 'MULTI';

function useAccounts() {
    const accounts = useSelector(({ main }) => main.accounts);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const transactionCheckIntervalRef = useRef();

    useEffect(() => {
        loadAccounts();
        navigation.dispatch((state) => {
            const routes = state.routes.filter(
                (r) => r.name != screensIdentifiers.splash
            );
            const index = state.routes.findIndex(
                (r) => r.name === screensIdentifiers.main
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
        // console.warn('OKAY' + Date.now());
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
