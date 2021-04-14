import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { mainActions } from '../services';
import navigator from '../../../navigation';

const Item = ({ account, componentId }) => {
    const dispatch = useDispatch();
    const onItemPress = () => {
        dispatch(mainActions.selectAccount(account['id']));
        account?.transaction?.available
            ? navigator.goTo(componentId, navigator.screenIds.authTransaction)
            : navigator.goTo(componentId, navigator.screenIds.accessCode);
    };

    const renderErrorMessage = () => {
        return (
            account['error'] && (
                <View>
                    <Text style={styles.errorText}>
                        An error has occurred
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {' '}
                            !
                        </Text>
                    </Text>
                </View>
            )
        );
    };
    return (
        <TouchableOpacity style={styles.SListitem} onPress={onItemPress}>
            <Text style={styles.SListheader}>{account['name']}</Text>
            <Text style={styles.SListtitle}>{account['issuer']}</Text>
            {account.transaction?.available && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {renderErrorMessage()}
        </TouchableOpacity>
    );
};

export default Item;
