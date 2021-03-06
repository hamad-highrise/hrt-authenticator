import React, { useEffect, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './response.styles';
import screenIds from '../../../navigation/screensId';
import assets from '../../../assets';

const TransactionResponse = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(screenIds.main);
        }, 2 * 1000);
    }, []);
    const {
        params: { approve }
    } = useRoute();

    const message = useMemo(() => (approve ? 'Approved' : 'Denied'), [approve]);
    const imageSource = useMemo(
        () => (approve ? assets.images.authSuccess : assets.images.authDenied),
        [approve]
    );

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.img} />
            <View style={styles.responseView}>
                <Text style={styles.responseText}>{message}!</Text>
            </View>
        </View>
    );
};

export default TransactionResponse;
