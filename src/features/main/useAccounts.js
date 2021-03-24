import { useEffect, useRef, useState } from 'react';
import {
    useNavigationComponentDidAppear,
    useNavigationComponentDidDisappear
} from 'react-native-navigation-hooks/dist';
import { constants, getTransactions } from '../services';
import queries from './queries';

function useAccounts(componentId) {
    const [accounts, setAccounts] = useState([]);
    const [err, setError] = useState({});
    const transactionCheckIntervalRef = useRef();

    useEffect(() => {
        checker();
        const id = setInterval(checker, 1000 * 5);
        transactionCheckIntervalRef.current = id;
        return () => {
            clearInterval(transactionCheckIntervalRef.current);
        };
    }, []);

    useNavigationComponentDidAppear(
        () => {
            checker();
        },
        { componentId }
    );

    // useNavigationComponentDidDisappear(
    //     () => {
    //         clearInterval(transactionCheckIntervalRef.current);
    //     },
    //     { componentId }
    // );

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
            const mAccounts = await queries.getAll();
            setAccounts(mAccounts);
            const checkedAccounts = await Promise.all(
                mAccounts.map(async (account) => {
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
            setAccounts(checkedAccounts);
        } catch (error) {
            setError(error);
        }
    };
    return { accounts, error: err };
}

export default useAccounts;
