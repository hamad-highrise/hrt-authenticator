import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import accountQueries from '../queries';

const Item = ({ account, onPress }) => {
    const onAccountPress = async () => {
        try {
            const mSecret = await accountQueries.getSecretByAccountId(
                account['account_id']
            );
            onPress(
                account['account_id'],
                account['account_name'],
                account['issuer'],
                mSecret
            );
        } catch (error) {
            alert(error);
        }
    };
    return (
        <TouchableOpacity style={styles.SListitem} onPress={onAccountPress}>
            <Text style={styles.SListheader}>HBL PIM {account['account_name']}</Text>
            <Text style={styles.SListtitle}>test.isd {account['issuer']}</Text>
        </TouchableOpacity>
    );
};

export default Item;
