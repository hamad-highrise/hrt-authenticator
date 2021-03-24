import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { cipher } from '../../../native-services';
import accountQueries from '../queries';
import constants from '../../services/constants';

const Item = ({ account, onPress }) => {
    const onItemPress = async () => {
        try {
            const secret = await accountQueries.getSecretByAccountId(
                account['account_id']
            );

            const { decrypted } = await cipher.decrypt({
                keyAlias: constants.KEY_ALIAS.SECRET,
                cipherText: secret
            });

            onPress({ ...account, secret: decrypted });
        } catch (error) {
            console.warn(error);
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
