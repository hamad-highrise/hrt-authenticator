import { useEffect, useMemo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { hooks, constants } from '../../../global';
import screensIdentifiers from '../../../navigation/screensId';

const { useSelected } = hooks;

function useTransaction() {
    const { transactions } = useSelector((state) => state);
    const navigation = useNavigation();
    const { id, type } = useSelected();
    const intervalRef = useRef();

    useEffect(() => {
        type === constants.ACCOUNT_TYPES.SAM &&
            transaction &&
            navigation.navigate(screensIdentifiers.authTransaction);
    }, [JSON.stringify(transactions)]);
}

export default useTransaction;
