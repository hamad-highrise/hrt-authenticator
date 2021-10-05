import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { totpGenerator, getSecret } from '../services';
import { hooks } from '../../../global';
import { useFocusEffect } from '@react-navigation/core';

const DEFAULT_PERIOD = 30;
const MIL_TO_SEC_DIV = 1000.0;
const COUNTER_INIT = 0;

const { useSelected } = hooks;

function useTotp(onError) {
    const { id: accId } = useSelected();
    const [counter, setCounter] = useState(COUNTER_INIT);
    const [otp, setOtp] = useState('######');

    const appState = useRef(AppState.currentState);
    const intervalRef = useRef();

    useFocusEffect(
        useCallback(() => {
            updateOtp();
            intervalRef.current = setInterval(timer, 1000);
            AppState.addEventListener('change', onAppStateChange);

            return () => {
                clearInterval(intervalRef.current);
                // has been deprecated in rn-0.65. Wait for patch in next version
                AppState.removeEventListener('change', onAppStateChange);
            };
        }, [])
    );

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

    const updateOtp = useCallback(async () => {
        try {
            const secret = await getSecret(accId);
            secret && setOtp(totpGenerator(secret));
        } catch (error) {
            onError && onError();
            alert(
                'Account have invalid secret. Delete the account and enter a valid Secret.'
            );
        }
    }, [accId]);

    return { otp, counter };
}

export default useTotp;
