import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    AppState,
    TouchableHighlight,
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
    const [fragment, setFragment] = useState('code');

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        //App state event listener, in case if app goes to background and comes to foreground. User get to see the updated OTP
        AppState.addEventListener('change', handleAppStateChange);
        const x = setInterval(timer, 1000);
        // getTran();
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

    const onRefereshClick = () => {
        getTran();
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

    const codeFragment = (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <PercentageCircle
                borderWidth={12}
                radius={130}
                percent={(counter / 30) * 100}
                color="#1c9db2">
                <Text style={{ fontWeight: 'bold', fontSize: 35 }}>
                    {otp.split('').join(' ')}
                </Text>
                <Text>{counter} seconds</Text>
            </PercentageCircle>
        </View>
    );
    const settings = (
        <Button
            title="Remove Account"
            style={styles.btn}
            onPress={() => alert('Ye Account Hatao bhae')}
        />
    );

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
                    <IconButton onPress={onRefereshClick}>
                        <Image
                            source={require('../../assets/icons/refresh.png')}
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
                        onPress={() => setFragment('code')}>
                        <Text style={styles.textStyle}>Access Code</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.selectorStyleInvert}
                        onPress={() => setFragment('settings')}>
                        <Text style={styles.textStyleInvert}>Settings</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.bottom}>
                {fragment == 'code' ? codeFragment : settings}
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
