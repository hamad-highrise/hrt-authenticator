import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { mainActions } from '../services';
import navigator from '../../../navigation';

const Item = ({ account, onPress, componentId }) => {
    const dispatch = useDispatch();

    const onItemPress = () => {
        dispatch(mainActions.selectAccount(account['id']));
        onPress({ ...account });
    };

    const onItemPressX = () => {
        dispatch(mainActions.selectAccount(account['id']));
        account?.transaction?.available
            ? navigator.goTo(componentId, navigator.screenIds.authTransaction)
            : navigator.goTo(componentId, navigator.screenIds.accessCode);
    };
    return (
        <TouchableOpacity style={styles.SListitem} onPress={onItemPress}>
            <Text style={styles.SListheader}>{account['name']}</Text>
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
