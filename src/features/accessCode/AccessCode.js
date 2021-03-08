import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, AppState, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components';

import navigator from '../../navigation';
import PropTypes from 'prop-types';
import styles from './styles';
import TOTPGenerator from './totp';
import services from './services';
import { AccessCodeFragment, SettingsFragment } from './components';
import { removeAccount } from '../services';

const AccessCode = (props) => {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    const [fragment, setFragment] = useState('CODE');

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        //App state event listener, in case if app goes to background and comes to foreground. User get to see the updated OTP
        AppState.addEventListener('change', handleAppStateChange);
        const x = setInterval(timer, 1000);
        updateOtp();
        return () => {
            //Here listeners are being removed on component unmount
            AppState.removeEventListener('change', handleAppStateChange);
            clearInterval(x);
        };
    }, []);
    const onBackPress = () => {
        navigator.goBack(props.componentId);
    };

    const getTran = async () => {
        try {
            const result = await services.getTransactions(props.id);
            if (result.success) {
                if (result.transaction) {
                    const {
                        displayMessage,
                        requestUrl,
                        createdAt,
                        transactionId
                    } = result.transaction;
                    navigator.goTo(
                        props.componentId,
                        navigator.screenIds.authTransaction,
                        {
                            id: props.id,
                            message: displayMessage,
                            endpoint: requestUrl,
                            createdAt,
                            transactionId
                        }
                    );
                }
            } else if (result.message === 'SERVER_NO_DEVICE') {
                alert('Device has been removed');
            } else {
                alert('UNKNOWN');
            }
        } catch (error) {
            alert(error);
        }
    };

    const onRefereshClick = () => {
        getTran();
    };

    const handleRemoveAccount = async () => {
        try {
            const result = await removeAccount({
                accId: props.id,
                type: props.type
            });
            navigator.goToRoot(props.componentId);
            alert(JSON.stringify(result));
        } catch (error) {
            console.warn(error);
        }
    };

    const handleAppStateChange = (nextAppState) => {
        if (
            //inactive of iOS and background for android
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            updateOtp();
        }
        appState.current = nextAppState;
    };

    const updateOtp = () => {
        setOTP(TOTPGenerator(props.secret));
    };
    const timer = (TOTP_PERIOD = 30) => {
        //function executes every second and checks if specific time period is passed and updates the otp.
        let epoch = Math.round(new Date().getTime() / 1000.0);
        setCounter(TOTP_PERIOD - (epoch % TOTP_PERIOD));
        if (epoch % TOTP_PERIOD == 0) updateOtp();
    };
    const onCodeSelect = () => setFragment('CODE');
    const onSettingsSelect = () => setFragment('SETTINGS');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ backgroundColor: 'black', height: 54 }}>
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
                <View style={{ backgroundColor: 'black', height: 54 }}>
                    <IconButton onPress={onRefereshClick}>
                        <Image
                            source={require('../../assets/icons/refreshinvert.png')}
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

            {/* <View style={{ margin: 0 }}></View> */}
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{props.name}</Text>
                    <Text style={styles.titleIDText}>{props.issuer}</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.slectorContainer}>
                    <TouchableOpacity
                        onPress={onCodeSelect}
                        style={[
                            styles.selector,
                            fragment === 'CODE'
                                ? { ...styles.selected, ...styles.selectedLeft }
                                : {
                                      ...styles.selectedInvert,
                                      ...styles.selectedInvertLeft
                                  }
                        ]}>
                        <Text
                            style={[
                                styles.selectorText,
                                fragment === 'CODE' && styles.selectedText
                            ]}>
                            Access code
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.selectorSeparator} />
                    <TouchableOpacity
                        onPress={onSettingsSelect}
                        style={[
                            styles.selector,
                            fragment === 'SETTINGS'
                                ? {
                                      ...styles.selected,
                                      ...styles.selectedRight
                                  }
                                : {
                                      ...styles.selectedInvert,
                                      ...styles.selectedInvertRight
                                  }
                        ]}>
                        <Text
                            style={[
                                styles.selectorText,
                                fragment === 'SETTINGS' && styles.selectedText
                            ]}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottom}>
                {fragment == 'CODE' ? (
                    <AccessCodeFragment otp={otp} counter={counter} />
                ) : (
                    <SettingsFragment removeAccount={handleRemoveAccount} />
                )}
            </View>

            <View style={{ margin: 10 }}></View>
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
    server: '*Server Name*',
    issuer: '*test.isd*',
    secret: '*000000*'
};

AccessCode.options = {
    topBar: {
        visible: false
    }
};

export default AccessCode;
