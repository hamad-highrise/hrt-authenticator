import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';

import { constants } from '../../../global';
import { biometrics } from '../../../native-services';
import screensIdentifiers from '../../../navigation/screensId';

const NotifySuccess = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { serviceName, type, methods, accId } = params;
    useEffect(() => {
        init();
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            goBack
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const init = () => {
        setTimeout(async () => {
            if (
                type === constants.ACCOUNT_TYPES.SAM &&
                methods.includes('fingerprint')
            ) {
                const { available } = await biometrics.isSensorAvailable();
                available &&
                    navigation.navigate(screensIdentifiers.biometricOption, {
                        serviceName,
                        accId
                    });
            } else navigation.navigate(screensIdentifiers.main);
        }, 3000);
    };

    const goBack = () => {
        navigation.navigate(screensIdentifiers.main);
        return true;
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../assets/icons/tick.png')}></Image>
            <View>
                <Text style={styles.instructions}>
                    This device and your
                    <Text style={{ fontWeight: 'bold' }}> {serviceName} </Text>
                    account are now connected.
                </Text>
            </View>
        </View>
    );
};
NotifySuccess.propTypes = {
    title: PropTypes.string
};

NotifySuccess.defaultProps = {
    title: 'SAMPLE'
};

export default NotifySuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 25,
        paddingLeft: 25
    },
    instructions: {
        textAlign: 'center',
        marginLeft: 20,
        color: 'black',
        marginBottom: 5,
        fontSize: 18,
        paddingRight: 26
    },
    image: {
        width: 150,
        height: 150
    }
});
