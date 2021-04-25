import { useEffect, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';

import navigator from '../../../navigation';
import { mainActions } from '../../main/services';
import { getSecret, totpGenerator } from '../services';
import { services, constants } from '../../../global';
import { alertActions } from '../../alert';

const CHECKTYPE = 'SELECTED';

function useAccessCode({ componentId }) {
    const selected = useSelector(({ main }) => main.selected);
    const { isConnected } = useSelector(({ alert }) => alert);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    const [fragment, setFragment] = useState('CODE');
    const [loading, setLoading] = useState(false);
    const otpIntervalRef = useRef();
    const transactionIntervalRef = useRef();
    let onScreen = useRef().current;
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        //initiate
        updateOtp();
    }, []);

    useEffect(() => {
        //intervals
        otpIntervalRef.current = setInterval(timer, 1000);
        //if account type is sam, register an interval
        selected['type'] === constants.ACCOUNT_TYPES.SAM &&
            (transactionIntervalRef.current = setInterval(checker, 3000));
        return () => {
            clearInterval(transactionIntervalRef.current);
            clearInterval(otpIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        //listeners
        AppState.addEventListener('change', onAppStateChange);
        const appear = Navigation.events().registerComponentDidAppearListener(
            onAppear
        );
        const disappear = Navigation.events().registerComponentDidDisappearListener(
            onDisappear
        );
        return () => {
            //remove listeners
            AppState.removeEventListener('change', onAppStateChange);
            appear.remove();
            disappear.remove();
        };
    }, []);

    useEffect(() => {
        selected['type'] === constants.ACCOUNT_TYPES.SAM &&
            selected.transaction.available &&
            navigator.goTo(componentId, navigator.screenIds.authTransaction);
    }, [selected?.transaction?.available]);

    const onAppear = ({ componentName }) => {
        navigator.screenIds.accessCode === componentName && (onScreen = true);
    };

    const onDisappear = ({ componentName }) => {
        navigator.screenIds.accessCode === componentName && (onScreen = false);
    };

    const onAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            updateOtp();
        }
        appState.current = nextAppState;
    };

    const timer = (TOTP_PERIOD = 30) => {
        let epoch = Math.round(new Date().getTime() / 1000.0);
        setCounter(TOTP_PERIOD - (epoch % TOTP_PERIOD));
        if (epoch % TOTP_PERIOD == 0) {
            updateOtp();
        }
    };

    const updateOtp = async () => {
        try {
            const secret = await getSecret(selected['id']);
            secret && setOTP(totpGenerator(secret));
        } catch (error) {
            setFragment('SETTINGS');
            alert(
                'Account have invalid secret. Delete the account and enter a valid Secret.'
            );
        }
    };

    const onCodeSelect = () => setFragment('CODE');
    const onSettingsSelect = () => setFragment('SETTINGS');

    const checker = () => {
        isConnected &&
            dispatch(
                mainActions.checkTransaction({
                    accId: selected['id'],
                    checkType: CHECKTYPE,
                    ignoreSsl: selected['ignoreSsl']
                })
            );
    };

    const removeAccount = async () => {
        try {
            setLoading(true);
            await services.removeAccount({
                accId: selected['id'],
                type: selected['type'],
                ignoreSsl: selected['ignoreSsl']
            });
            dispatch(mainActions.getAllAccounts());
            navigator.goToRoot(componentId);
            
        } catch (error) {
            Alert.alert(
                'Force Account Deletion',
                'Unable to remove account from SAM. Delete forcefully?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            setLoading(false);
                        },
                        style: 'cancel'
                    },
                    {
                        text: 'Yes, Delete',
                        onPress: removeAccountFromDB,
                        style: 'destructive'
                    }
                ]
            );
            dispatch(alertActions.failure(error, selected['id']));
        }
    };

    const removeAccountFromDB = async () => {
        try {
            await services.removeAccountFromDB(selected['id']);
        } catch (error) {
            dispatch(alertActions.failure(error, selected['id']));
            // setLoading(false);
        } finally {
            dispatch(mainActions.getAllAccounts());
            navigator.goToRoot(componentId);
            // setTimeout(() => {
            //     navigator.goToRoot(componentId);
            //     setLoading(false);
            // }, 1000);
        }
    };

    return {
        otp,
        counter,
        fragment,
        onCodeSelect,
        onSettingsSelect,
        transactionCheck: checker,
        removeAccount,
        loading,
        account: {
            name: selected['name'],
            issuer: selected['issuer'],
            type: selected['type']
        },
        isConnected
    };
}

export default useAccessCode;
