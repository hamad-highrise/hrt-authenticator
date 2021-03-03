import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import accountQueries from '../queries';

const Item = ({ account, onPress }) => {
    const onAccountPress = async () => {
        try {
            const mSecret = await accountQueries.getSecretByAccountId(
                account['account_id']
            );
            onPress({ ...account, mSecret });
        } catch (error) {
            alert(error);
        }
    };
    return (
        <TouchableOpacity style={styles.SListitem} onPress={onAccountPress}>
            <Text style={styles.SListheader}>HBL PIM {account['account_name']}</Text>
            <Text style={styles.SListtitle}>test.isd {account['issuer']}</Text>
            {!false && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {!false && (
                <View>
                    <Text style={styles.errorText}>
                        Please contact HBL PIM{account['issuer']} support ❗
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Item;
