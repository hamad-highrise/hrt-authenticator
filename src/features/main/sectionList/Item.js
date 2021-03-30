import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { cipher } from '../../../native-services';
import accountQueries from '../queries';
import constants from '../../services/constants';
import { useDispatch } from 'react-redux';
import { mainActions } from '../services';

const Item = ({ account, onPress }) => {
    const dispatch = useDispatch();

    const onItemPress = () => {
        dispatch(mainActions.selectAccount(account['account_id']));
        onPress({ ...account });
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
