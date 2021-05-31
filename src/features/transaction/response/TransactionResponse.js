import React, { useCallback, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components';
import styles from './response.styles';
import screenIds from '../../navigation/screensId';

const TransactionResponse = () => {
    const navigation = useNavigation();
    const {
        params: { approve, success }
    } = useRoute();

    const goToMain = useCallback(() => navigation.navigate(screenIds.main), [
        JSON.stringify(navigation)
    ]);

    const message = `Authentication`;

    return (
        <View style={styles.container}>
            <Image
                source={
                    success && approve
                        ? require('../../assets/images/auth_success.png')
                        : require('../../assets/images/auth_fail.png')
                }
                style={styles.img}
            />
            <View style={styles.responseView}>
                <Text style={styles.responseText}>
                    Operation:{' '}
                    <Text
                        style={{ ...(approve ? styles.success : styles.fail) }}>
                        {approve ? 'Approve' : 'Deny'}
                    </Text>
                </Text>
                <Text style={styles.responseText}>
                    Status:{' '}
                    <Text
                        style={{
                            ...(success ? styles.success : styles.fail)
                        }}>
                        {success ? 'Success' : 'Failed'}
                    </Text>
                </Text>
            </View>

            <Button label="Back to Accounts" onPress={goToMain} />
        </View>
    );
};

export default TransactionResponse;
