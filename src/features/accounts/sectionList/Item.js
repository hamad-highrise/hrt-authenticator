import React, { useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './list.styles';
import { selectActions } from '../../selected';
import screensIdentifiers from '../../../navigation/screensId';

const Item = ({ account }) => {
    const navigation = useNavigation();
    const { transactions, errors } = useSelector((state) => state);

    const dispatch = useDispatch();
    const accTransaction = useMemo(
        () =>
            transactions.find(
                (transaction) => transaction['accId'] === account['id']
            ),
        [JSON.stringify(transactions)]
    );

    const accError = useMemo(
        () => errors.find((error) => account['id'] === error['accId']),
        [JSON.stringify(errors)]
    );

    const onItemPress = useCallback(() => {
        dispatch(selectActions.select(account['id']));
        accTransaction
            ? navigation.navigate(screensIdentifiers.authTransaction)
            : navigation.navigate(screensIdentifiers.accessCode);
    }, [JSON.stringify(accTransaction)]);

    const renderErrorMessage = () => {
        return (
            accError && (
                <View>
                    <Text style={styles.errorText}>
                        {accError?.error.displayMessage}
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
            {accTransaction && (
                <Text style={styles.notificationText}>Transaction Pending</Text>
            )}
            {renderErrorMessage()}
        </Pressable>
    );
};

export default Item;
