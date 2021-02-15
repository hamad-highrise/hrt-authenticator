import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    AppState,
    TouchableHighlight,
    Dimensions,
    Animated
} from 'react-native';
import { IconButton } from '../../components';
import navigator from '../../navigation';
import PropTypes from 'prop-types';
import styles from './styles';
import TOTPGenerator from './totp';

import { PercentageCircle } from '../../components';
import { Button } from '../../components';
import services from './services';


const AccessCode = (props) => {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');

    // const appState = useRef(AppState.currentState);
    // useEffect(() => {
    //     //App state event listener, in case if app goes to background and comes to foreground. User get to see the updated OTP
    //     AppState.addEventListener('change', handleAppStateChange);
    //     const x = setInterval(timer, 1000);
    //     updateOtp();
    //     return () => {
    //         //Here listeners are being removed on component unmount
    //         AppState.removeEventListener('change', handleAppStateChange);
    //         clearInterval(x);
    //     };
    // }, []);
    const appState = useRef(AppState.currentState);
    useEffect(() => {
        //App state event listener, in case if app goes to background and comes to foreground. User get to see the updated OTP
        AppState.addEventListener('change', handleAppStateChange);
        const x = setInterval(timer, 1000);
        getTran();
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
                    alert(result.transaction.displayMessage);
                } else alert('No Pending transaction');
            } else if (result.message === 'SERVER_NO_DEVICE') {
                alert('Device has been removed');
            } else {
                alert('UNKNOWN');
            }
        } catch (error) {
            alert(error);
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

    const onPressHandlerAccountSettings = () => {
        navigator.goTo(props.componentId, navigator.screenIds.accountSettings, {
            id: props.id,
            name: props.name,
            issuer: props.issuer
        });
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
    //
    var state = {
        animatePress: new Animated.Value(1)
    };
    // var animateIn = () => {
    //     Animated.timing(state.animatePress, {
    //         toValue: 0.8,
    //         duration: 200
    //     }).start();
    // };
    // var animateOut = () => {
    //     Animated.timing(state.animatePress, {
    //         toValue: 1,
    //         duration: 200
    //     }).start();
    // };
    // 
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000
      }).start();
    };
  
    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 5000
      }).start();
    };
    //
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds >= 60) {
                setSeconds((seconds) => seconds - seconds);
            } else {
                setSeconds((seconds) => seconds + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    //
    const helo = (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    width: 250,
                    height: 250,
                    backgroundColor: '#1c9db2',
                    borderRadius: 250 / 2
                }}>
                <View
                    style={{
                        width: 220,
                        height: 220,
                        backgroundColor: '#424c58',
                        borderRadius: 220 / 2,
                        margin: 15
                    }}>
                    <Text
                        style={{
                            fontSize: 42,
                            color: 'white',
                            textAlign: 'center',
                            paddingVertical: 75
                        }}>
                        {' '}
                        {'453 215'}{' '}
                    </Text>
                </View>
            </View>
        </View>
    );
    const bi = (
        <Button
            title="Remove Account"
            style={styles.btn}
            onPress={() => alert('Ye Account Hatao bhae')}
        />
    );
    const [count, setCount] = useState(0);

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
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'stretch'
                    }}>
                    <TouchableHighlight
                        style={styles.selectorStyle}
                        onPress={() => setCount(2)}>
                        <Text style={styles.textStyle}>Access Code</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.selectorStyleInvert}
                        onPress={() => setCount(1)}>
                        <Text style={styles.textStyleInvert}>Settings</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text>{seconds} seconds have elapsed since mounting.</Text>
                {count == 2 ? helo : bi}

                {/* <PercentageCircle /> */}

                {/* <TouchableHighlight 
                    onPressIn={() => animateIn()}
                    onPressOut={() => animateOut()}>
                    <Animated.View
                        useNativeDriver={true}
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'cyan',
                            transform: [{ scale: state.animatePress }]
                        }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/icons/add.png')}></Image>
                    </Animated.View>
                </TouchableHighlight> */}
            </View>
            {/* <View style={styles.bottom}>
                <View style={styles.title}>
                    <Text style={styles.titleCodeText}>{otp}</Text>
                    <Text style={styles.titleTimerText}>{counter}</Text>
                </View>
            </View> */}
            <Animated.View
                style={[
                {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: "powderblue",
                    opacity: fadeAnim // Bind opacity to animated value
                }
                ]}
            >
                <Text style={styles.fadingText}>Fading View!</Text>
            </Animated.View>
            <View style={styles.buttonRow}>
                <Button title="Fade In" onPress={fadeIn} />
                <Button title="Fade Out" onPress={fadeOut} />
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
