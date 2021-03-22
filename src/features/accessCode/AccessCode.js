import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    AppState,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { IconButton } from '../../components';
import navigator from '../../navigation';
import PropTypes from 'prop-types';
import styles from './styles';
import TOTPGenerator from './totp';
import { AccessCodeFragment, SettingsFragment } from './components';
import { removeAccount, getTransactions } from '../services';

const AccessCode = (props) => {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    const [fragment, setFragment] = useState('CODE');
    const { transaction } = props;

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        //App state event listener, in case if app goes to background and comes to foreground. User get to see the updated OTP
        props?.transaction?.available &&
            navigator.goTo(
                props.componentId,
                navigator.screenIds.authTransaction,
                {
                    id: props.id,
                    message: transaction.displayMessage,
                    endpoint: transaction.requestUrl,
                    createdAt: transaction.createdAt,
                    transactionId: transaction.transactionId
                }
            );
        AppState.addEventListener('change', handleAppStateChange);
        const x = setInterval(timer, 1000);
        updateOtp();
        return () => {
            //Here listeners are being removed on component unmount
            AppState.removeEventListener('change', handleAppStateChange);
            clearInterval(x);
        };
    }, []);
    var spinValue = useRef(new Animated.Value(0)).current;
    const onBackPress = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
        // navigator.goBack(props.componentId);
    };
    // spinValue = new Animated.Value(0);
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const getTran = async () => {
        try {
            const result = await getTransactions({ accId: props.id });
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
        try {
            setOTP(TOTPGenerator(props.secret));
        } catch (error) {
            setFragment('SETTINGS');
            alert(
                'Account have invalid secret. Delete the account and enter a valid Secret.'
            );
        }
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
                <View
                    style={{ height: 52 }}
                    style={{ transform: [{ rotate: '180deg' }] }}>
                    <IconButton onPress={onRefereshClick}>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 9,
                                    marginTop: 6
                                }
                            ]}
                        />
                    </IconButton>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleMainText}></Text>
                </View>
                <View style={{ height: 52 }}>
                    <IconButton onPress={onBackPress}>
                        <Animated.Image
                            source={require('../../assets/icons/refreshinvertblack.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 6,
                                    marginTop: 10,
                                    transform: [{ rotate: spin }]
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
