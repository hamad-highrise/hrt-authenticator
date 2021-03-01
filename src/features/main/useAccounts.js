import { useState, useEffect } from 'react';
import queries from './queries';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';

function useAccounts({ componentId }) {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        getAllAccounts();
    }, []);

    useNavigationComponentDidAppear(
        () => {
            getAllAccounts();
        },
        { componentId: componentId }
    );

    const getAllAccounts = async () => {
        try {
            const mAccounts = await queries.getAll();
            setAccounts(mAccounts);
        } catch (error) {
            console.warn(error);
        }
    };
    return { accounts };
}

export { useAccounts };
