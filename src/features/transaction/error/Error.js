import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../../components';
import screenIds from '../../../navigation/screensId';
import styles from './error.styles';
import assets from '../../../assets';

const ErrorScreen = () => {
    const {
        params: { message }
    } = useRoute();
    const navigation = useNavigation();

    const onPress = useCallback(() => {
        navigation.navigate(screenIds.main);
    }, [JSON.stringify(navigation)]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={assets.images.error} />
            <Text style={styles.message}>{message}</Text>
            <Button label="Back to accounts" onPress={onPress} />
        </View>
    );
};

export default ErrorScreen;
