import React, { useEffect, useState } from 'react';
import { Text, Image, View, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, LoadingIndicator } from '../../../components';
import { fingerprint as registerBiometrics } from '../services/registerMethods';
import { services, utils } from '../../../global';
import screensIdentifiers from '../../../navigation/screensId';
import assets from '../../../assets';

import styles from './biomrtic.styles';

const { getAccessToken } = services;
const { getEnrollmentEndpoint } = utils;

const BiometricOption = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {
        params: { accId, serviceName }
    } = useRoute();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            goBack
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const goBack = () => {
        navigation.navigate(screensIdentifiers.main);
        return true;
    };

    const onNegative = () => {
        navigation.navigate(screensIdentifiers.complete, { serviceName });
    };

    const onPositive = async () => {
        try {
            setLoading(true);
            const accessToke = await getAccessToken(accId);
            const enrollmentEndpoint = await getEnrollmentEndpoint(accId);
            await registerBiometrics({
                endpoint: enrollmentEndpoint,
                token: accessToke,
                accId,
                ignoreSsl: true
            });
            setLoading(false);
            navigation.navigate(screensIdentifiers.complete, { serviceName });
        } catch (error) {
            setLoading(false);
            alert('Unable to register biometrics. Try adding account again.');
            navigation.navigate(screensIdentifiers.main);
        }
    };

    return loading ? (
        <LoadingIndicator show={loading} />
    ) : (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}></View>
            <Image
                style={styles.image}
                source={assets.icons.addFingerprint}></Image>
            <View>
                <Text style={styles.welcome}>Biometric</Text>
                <Text style={styles.instructions}>
                    Use biometric as a verification method to keep your account
                    safe.
                </Text>
            </View>
            <View>
                <Button
                    label="Use Biometric"
                    style={styles.btn}
                    onPress={onPositive}
                />
                <View style={{ margin: 10 }} />
                <Button
                    label="No, Thanks"
                    onPress={onNegative}
                    style={styles.negativeButton}
                />
            </View>
            <View style={{ marginBottom: 20 }} />
        </View>
    );
};

export default BiometricOption;
