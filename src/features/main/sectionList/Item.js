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
            <Text style={styles.SListheader}> {account['account_name']}</Text>
            <Text style={styles.SListtitle}> {account['issuer']}</Text>
            {!true && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {!true && (
                <View>
                    <Text style={styles.errorText}>
                        Please Contact {account['issuer']}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Item;
