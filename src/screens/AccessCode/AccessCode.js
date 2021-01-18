import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { IconButton } from '../../components';
import { Navigation } from 'react-native-navigation';
import TOTPGenerator from '../../util/totp-generator';

const AccessCode = (props) => {
    const [counter, setCounter] = useState(0);
    const [otp, setOTP] = useState('######');
    useEffect(() => {
        const x = setInterval(timer, 1000);
        updateOtp();
        return () => clearInterval(x);
    }, []);
    const onPressHandlerAccountSettings = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccountSettingsScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const updateOtp = () => {
        setOTP(TOTPGenerator(props.secret.trim()));
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
                    <IconButton onPress={() => alert('Go to Main screen')}>
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
                    <Text style={styles.titleText}>{props.issuer}</Text>
                    <Text style={styles.titleIDText}>{props.accName}</Text>
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

AccessCode.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'lightgrey',
        padding: 20,
        margin: 10
    },
    header: {
        flexDirection: 'row',
        height: 53,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 36,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        flex: 0.2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    titleIDText: {
        fontSize: 24
    },
    middle: {
        flex: 0.1
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 48,
        fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        marginLeft: Dimensions.get('window').width * 0.11,
        marginRight: Dimensions.get('window').width * 0.18
    },
    bottom: {
        flex: 0.3
    },
    titleTimerText: {
        color: 'lightgrey',
        fontSize: 36,
        borderColor: 'darkgrey',
        borderBottomWidth: 5,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: '#424c58',
        width: 150,
        height: 140,
        borderRadius: 100 / 2,
        textAlign: 'center'
    },
    titleTimerNameText: {
        fontSize: 12,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2
    }
});

export default AccessCode;
