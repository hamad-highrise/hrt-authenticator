import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
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
        <Pressable
            style={styles.SListitem}
            onPress={onItemPress}
            android_ripple={{ color: 'grey' }}>
            <Text style={styles.issuer}>{account['issuer']}</Text>
            <Text style={styles.name}>{account['name']}</Text>
            {account?.transaction?.available && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {renderErrorMessage()}
        </Pressable>
    );
};

export default Item;
