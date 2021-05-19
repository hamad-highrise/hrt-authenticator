import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import styles from './list.styles';
import { mainActions } from '../services';
import screensIdentifiers from '../../../navigation/screensId';

const Item = ({ account }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onItemPress = () => {
        dispatch(mainActions.selectAccount(account['id']));
        account?.transaction?.available
            ? navigation.navigate(screensIdentifiers.authTransaction)
            : navigation.navigate(screensIdentifiers.accessCode);
    };

    const renderErrorMessage = () => {
        return (
            account?.error?.hasOccurred && (
                <View>
                    <Text style={styles.errorText}>
                        {account.error?.displayMessage}
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
