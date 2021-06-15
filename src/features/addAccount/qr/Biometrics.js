import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, LoadingIndicator } from '../../../components';
import { registerBiometrics } from './../mmfa/registerMethods';
import { services, utils } from '../../../global';
// import { alertActions } from '../../alert';
import screensIdentifiers from '../../../navigation/screensId';
import assets from '../../../assets';

const { getAccessToken } = services;
const { getEnrollmentEndpoint } = utils;

const BiometricOption = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {
        params: { accId, serviceName }
    } = useRoute();
    const dispatch = useDispatch();
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
            // dispatch(alertActions.request());
            const accessToke = await getAccessToken(accId);
            const enrollmentEndpoint = await getEnrollmentEndpoint(accId);
            await registerBiometrics({
                endpoint: enrollmentEndpoint,
                token: accessToke,
                accId,
                ignoreSsl: true
            });
            // dispatch(alertActions.success());
            setLoading(false);
            navigation.navigate(screensIdentifiers.complete, { serviceName });
        } catch (error) {
            setLoading(false);
            alert('Unable to register biometrics. Try adding account again.');
            // dispatch(alertActions.failure(error, accId));
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
            {/* <View style={{ margin: 5 }} /> */}
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
BiometricOption.propTypes = {
    accountName: PropTypes.string,
    styles: PropTypes.any
};

export default BiometricOption;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 25,
        paddingLeft: 25
    },
    welcome: {
        fontSize: 38,

        marginLeft: 20,
        margin: 10,
        color: 'black'
    },
    instructions: {
        marginLeft: 20,
        color: 'black',
        marginBottom: 5,
        fontSize: 16
    },
    image: {
        width: 150,
        height: 150
    },
    negativeButton: {
        backgroundColor: 'lightgrey'
    }
});
