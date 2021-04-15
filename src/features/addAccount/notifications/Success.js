import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';

import navigator from '../../../navigation';
import { constants } from '../../../global';
import { biometrics } from '../../../native-services';

const NotifySuccess = ({ title, type, methods, ...props }) => {
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
                    navigator.goTo(
                        props.componentId,
                        navigator.screenIds.biometricOption,
                        {
                            title: props.accountName,
                            accId: props.accId
                        }
                    );
            } else navigator.goToRoot(props.componentId);
        }, 3000);
    };

    const goBack = () => {
        navigator.goToRoot(props.componentId);
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
                    <Text style={{ fontWeight: 'bold' }}> {title} </Text>
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
