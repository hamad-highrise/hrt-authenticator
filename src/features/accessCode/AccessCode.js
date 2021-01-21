import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, AppState } from 'react-native';
import { IconButton } from '../../components';
import navigator from '../../navigation';
import PropTypes from 'prop-types';
import styles from './styles';
import TOTPGenerator from '../../util/totp-generator';

const AccessCode = (props) => {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    const appState = useRef(AppState.currentState);
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        const x = setInterval(timer, 1000);
        updateOtp();
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
            clearInterval(x);
        };
    }, []);
    const onBackPress = () => {
        navigator.goBack(props.componentId);
    };

    const handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            updateOtp();
        }
        appState.current = nextAppState;
    };

    const onPressHandlerAccountSettings = () => {
        navigator.goTo(props.componentId, navigator.screenIds.accountSettings);
    };
    const updateOtp = () => {
        setOTP(TOTPGenerator(props.secret));
    };
    const timer = () => {
        let epoch = Math.round(new Date().getTime() / 1000.0);
        setCounter(30 - (epoch % 30));
        if (epoch % 30 == 0) updateOtp();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={onBackPress}>
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={{
                                width: 25,
                                height: 35,
                                marginLeft: 6,
                                marginTop: 10
                            }}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleMainText}>Access Code</Text>
                </View>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={onPressHandlerAccountSettings}>
                        <Image
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 9,
                                    marginTop: 12,
                                    width: 25,
                                    height: 30
                                }
                            ]}
                        />
                    </IconButton>
                </View>
            </View>

            <View style={{ margin: 0 }}></View>
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{props.name}</Text>
                    <Text style={styles.titleIDText}>{props.issuer}</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.title}>
                    <Text style={styles.titleCodeText}>{otp}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.title}>
                    <Text style={styles.titleTimerText}>{counter}</Text>
                </View>
            </View>
            <View style={{ margin: 5 }}></View>
        </View>
    );
};

AccessCode.propTypes = {
    secret: PropTypes.string.isRequired,
    name: PropTypes.string,
    server: PropTypes.string
};

AccessCode.defaultProps = {
    name: '*Account Name*',
    server: '*Server Name*'
};

AccessCode.options = {
    topBar: {
        visible: false
    }
};

export default AccessCode;
