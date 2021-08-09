import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { hooks, services } from '../../../global';
import { accountActions } from '../../actions.public';
import { errActions } from '../../errorUtils';

// import { accountActions } from '../../accounts';

const { useSelected } = hooks;
function useRemove() {
    const { id: accId, ignoreSsl, type } = useSelected();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const removeAccount = async () => {
        try {
            setLoading(true);
            await services.removeAccount({
                accId,
                type,
                ignoreSsl
            });
            dispatch(accountActions.removeAccount(accId));
            setLoading(false);
            navigation.goBack();
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
            dispatch(errActions.add({ accId, error: error }));
        }
    };

    const removeAccountFromDB = async () => {
        try {
            await services.removeAccountFromDB(accId);
            dispatch(accountActions.removeAccount(accId));
        } catch (error) {
            dispatch(errActions.add({ accId, error: error }));
        } finally {
            navigation.goBack();
        }
    };

    return { removeAccount, loading };
}

export default useRemove;
