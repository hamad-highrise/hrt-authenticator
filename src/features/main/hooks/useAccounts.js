import { useEffect, useRef } from 'react';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { useDispatch, useSelector } from 'react-redux';
import { constants, getTransactions } from '../../services';
import { mainActions } from '../services';

function useAccounts(componentId) {
    const accounts = useSelector(({ main }) => main.accounts);
    const dispatch = useDispatch();
    const transactionCheckIntervalRef = useRef();

    useEffect(() => {
        loadAccounts();
        return () => {
            clearInterval(transactionCheckIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        transactionCheckIntervalRef.current &&
            clearInterval(transactionCheckIntervalRef.current);
        const id = setInterval(checker, 1000 * 5);
        transactionCheckIntervalRef.current = id;
    }, [accounts.length]);

    useNavigationComponentDidAppear(
        () => {
            loadAccounts();
        },
        { componentId }
    );

    const loadAccounts = () => {
        dispatch(mainActions.getAllAccounts());
    };

    const checkTransaction = async ({ accId, ignoreSSL }) => {
        try {
            const { success, message, ...result } = await getTransactions({
                accId,
                ignoreSSL
            });
            if (success) {
                if (result?.transaction)
                    return Promise.resolve(result.transaction);
                else return Promise.resolve();
            } else return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const checker = async () => {
        try {
            const checkedAccounts = await Promise.all(
                accounts.map(async (account) => {
                    if (account.type === constants.ACCOUNT_TYPES.SAM) {
                        try {
                            const transaction = await checkTransaction({
                                accId: account['account_id']
                            });
                            return transaction
                                ? {
                                      ...account,
                                      transaction: {
                                          available: true,
                                          ...transaction
                                      }
                                  }
                                : account;
                        } catch (error) {
                            return {
                                ...account,
                                error: true
                            };
                        }
                    } else return account;
                })
            );
        } catch (error) {
            alert(`UseAccounts ERR`);
        }
    };
    return { accounts };
}

export default useAccounts;
