import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import accountQueries from '../queries';
import navigator from '../../../navigation';

const Item = ({ account, onPress }) => {
    const onItemPress = async () => {
        account?.transaction?.available ? navigator.goTo('', navigator.screenIds.authTransaction, {
            
        }) : '';
        try {

            const secret = await accountQueries.getSecretByAccountId(
                account['account_id']
            );
            onPress({ ...account, secret });
        } catch (error) {
            alert(error);
        }
    };
    return (
        <TouchableOpacity style={styles.SListitem} onPress={onItemPress}>
            <Text style={styles.SListheader}>{account['account_name']}</Text>
            <Text style={styles.SListtitle}>{account['issuer']}</Text>
            {account.transaction?.available && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {false && (
                <View>
                    <Text style={styles.errorText}>
                        Please contact {account['issuer']} support ❗
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Item;
