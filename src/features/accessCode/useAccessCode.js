import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import navigator from '../../navigation';
import { constants, getTransactions } from '../services';
import TOTPGenerator from './totp';

function useAccessCode({ secret, type, componentId, accId }) {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    const [fragment, setFragment] = useState('CODE');
    const otpIntervalRef = useRef();
    const transactionIntervalRef = useRef();
    const onScreenRef = useRef();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        updateOtp();
        onScreenRef.current = true;
        AppState.addEventListener('change', handleAppStateChange);
        otpIntervalRef.current = setInterval(timer, 1000);
        transactionIntervalRef.current = setInterval(checker, 3000);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
            clearInterval(transactionIntervalRef.current);
            clearInterval(otpIntervalRef.current);
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
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

    const updateOtp = () => {
        try {
            setOTP(TOTPGenerator(secret));
        } catch (error) {
            setFragment('SETTINGS');
            alert(
                'Account have invalid secret. Delete the account and enter a valid Secret.'
            );
        }
    };

    const onCodeSelect = () => setFragment('CODE');
    const onSettingsSelect = () => setFragment('SETTINGS');

    const checkTransaction = async () => {
        try {
            console.warn(accId);
            const { success, message, ...result } = await getTransactions({
                accId
            });
            return success && result?.transaction
                ? Promise.resolve(result.transaction)
                : Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const checker = async () => {
        if (type === constants.ACCOUNT_TYPES.SAM) {
            try {
                const transaction = await checkTransaction();
                if (transaction) {
                    clearInterval(transactionIntervalRef.current);
                    navigator.goTo(
                        componentId,
                        navigator.screenIds.authTransaction,
                        {
                            accId,
                            message: transaction.displayMessage,
                            endpoint: transaction.requestUrl,
                            createdAt: transaction.createdAt,
                            transactionId: transaction.transactionId
                        }
                    );
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    };

    return {
        otp,
        counter,
        fragment,
        onCodeSelect,
        onSettingsSelect,
        transactionCheck: checker
    };
}

export default useAccessCode;
