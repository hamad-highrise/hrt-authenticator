import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSelector } from 'react-redux';

import { totpGenerator, getSecret } from '../services';
import useTabs from './useTabs';
import useSelected from './useSelected';

const DEFAULT_PERIOD = 30;
const MIL_TO_SEC_DIV = 1000.0;
const COUNTER_INIT = 0;

function useTotp() {
    const { id: accId } = useSelected();
    const [counter, setCounter] = useState(COUNTER_INIT);
    const [otp, setOtp] = useState('######');

    const { setSettingsTab } = useTabs();

    const appState = useRef(AppState.currentState);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(timer, 1000);
        AppState.addEventListener('change', onAppStateChange);

        return () => {
            clearInterval(intervalRef.current);
            AppState.removeEventListener('change', onAppStateChange);
        };
    }, []);

    const secret = useMemo(async () => {
        return await getSecret(accId);
    }, [accId]);

    const timer = (TOTP_PERIOD = DEFAULT_PERIOD) => {
        let epoch = Math.round(new Date().getTime() / MIL_TO_SEC_DIV);
        const epochMod = epoch % TOTP_PERIOD;
        setCounter(TOTP_PERIOD - epochMod);
        epochMod === 0 && updateOtp();
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

    const updateOtp = useCallback(() => {
        try {
            secret && setOtp(totpGenerator(secret));
        } catch (error) {
            setSettingsTab();
            alert(
                'Account have invalid secret. Delete the account and enter a valid Secret.'
            );
        }
    }, [accId]);

    return { otp, counter };
}

export default useTotp;
