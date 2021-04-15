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
import { Button, LoadingIndicator } from '../../../components';
import navigator from '../../../navigation';
import { registerBiometrics } from './../mmfa/registerMethods';
import { biometrics } from '../../../native-services';
// import { getToken, getEnrollmentEndpoint } from '../../services';
import { services, utils } from '../../../global';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../alert';

const { getAccessToken } = services;
const { getEnrollmentEndpoint } = utils;

const BiometricOption = ({ accId, accountName, ...props }) => {
    const { loading } = useSelector(({ alert }) => alert);
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
        navigator.goToRoot(props.componentId);
        return true;
    };

    const onPositiveX = async () => {
        try {
            dispatch(alertActions.request());
            const accessToke = await getAccessToken(accId);
            const enrollmentEndpoint = await getEnrollmentEndpoint(accId);
            await registerBiometrics({
                endpoint: enrollmentEndpoint,
                token: accessToke,
                accId
            });
            dispatch(alertActions.success());
            navigator.goTo(props.componentId, navigator.screenIds.complete, {
                title: accountName
            });
        } catch (error) {
            alert('Unable to register biometrics. Try adding account again.');
            dispatch(alertActions.failure(error, accId));
            navigator.goToRoot(props.componentId);
        }
    };

    return loading ? (
        <LoadingIndicator show={loading} />
    ) : (
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
            {/* <View style={{ margin: 5 }} /> */}
            <View>
                <Button
                    title="Use Biometric"
                    style={styles.btn}
                    onPress={onPositiveX}
                />
                <View style={{ margin: 10 }} />
                <Button
                    title="No, Thanks"
                    onPress={goBack}
                    style={styles.btnInvert}
                />
            </View>
            <View style={{ marginBottom: 20 }} />
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
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    btnInvert: {
        backgroundColor: 'lightgrey',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    }
});
