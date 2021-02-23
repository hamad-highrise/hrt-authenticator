import React, { useEffect } from 'react';
import {
    Dimensions,
    Text,
    Image,
    StyleSheet,
    View,
    BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../../components';
import navigator from '../../../navigation';
import { registerBiometrics } from './../mmfa/registerMethods';
import biometric from '../../../util/biometrics';

const BiometricOption = ({ endpoint, token, ...props }) => {
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
        navigator.goToRoot(props.componentId);
        return true;
    };

    const onPositive = async () => {
        try {
            const { available, error } = await biometric.isSensorAvailable();
            if (available) {
                const result = await registerBiometrics(endpoint, token);
                if (result && result.respInfo.status === 200) {
                    navigator.goToRoot(props.componentId);
                } else {
                    alert('Error registering biometrics');
                }
            } else {
                alert(JSON.stringify(error));
            }
        } catch (error) {
            alert(error);
        } finally {
            navigator.goToRoot(props.componentId);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}></View>
            <Image
                style={styles.image}
                source={require('../../../assets/icons/add-fingerprint.png')}></Image>
            <View>
                <Text style={styles.welcome}>Biometric</Text>
                <Text style={styles.instructions}>
                    Use biometric as a verification method to keep your account
                    safe.
                </Text>
            </View>
            <View style={{ margin: 5 }} />
            <Button
                title="Use Biometric"
                style={styles.btn}
                onPress={() => onPositive(endpoint, token)}
            />

            <Button
                title="No, Thanks"
                onPress={goBack}
                style={styles.btnInvert}
            />
            <View style={{ marginBottom: 20 }}></View>
        </View>
    );
};
BiometricOption.propTypes = {
    title: PropTypes.string,
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
    btn: {
        backgroundColor: '#ff8544',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'white',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
    btnInvert: {
        backgroundColor: '#1c9db2',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    }
});
