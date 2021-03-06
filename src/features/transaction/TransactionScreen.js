import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';

import styles from './transaction.styles';
import {
    LoadingIndicator,
    NetworkIndicator,
    TopNavbar
} from '../../components';
import { useTransaction } from './hooks';
import assets from '../../assets';

const AuthProcess = (props) => {
    const {
        message,
        createdAt,
        transactionId,
        onApprove,
        onReject,
        isConnected,
        loading
    } = useTransaction(props);

    const [viewDetails, setFragment] = useState('YES');
    const fadeViewDetailsLEFT = useRef(new Animated.Value(0)).current;
    const fadeViewDetailsOPA = useRef(new Animated.Value(1)).current;
    const fadeDetailsLEFT = useRef(new Animated.Value(-390)).current;
    const fadeDetailsOPA = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeViewDetailsLEFT value to 1 in 5 seconds
        Animated.timing(fadeViewDetailsLEFT, {
            toValue: 380,
            duration: 50,
            useNativeDriver: false
        }).start(() => {
            // setFragment('NO');
            Animated.timing(fadeDetailsOPA, {
                toValue: 1,
                duration: 201,
                useNativeDriver: false
            }).start();
            setFragment('NO');
            // slide right to left -390 to 0
            Animated.timing(fadeDetailsLEFT, {
                toValue: 0,
                duration: 50,
                useNativeDriver: false
            }).start();
        });
        Animated.timing(fadeViewDetailsOPA, {
            toValue: 0,
            duration: 201,
            useNativeDriver: false
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeViewDetailsLEFT value -390 to 0 in 2 seconds
        Animated.timing(fadeDetailsLEFT, {
            toValue: -390,
            duration: 50,

            useNativeDriver: false
        }).start(() => {
            setFragment('YES');
            Animated.timing(fadeViewDetailsLEFT, {
                toValue: 1,

                duration: 50,

                useNativeDriver: false
            }).start();

            Animated.timing(fadeViewDetailsOPA, {
                toValue: 1,

                duration: 201,

                useNativeDriver: false
            }).start();
        });
        Animated.timing(fadeDetailsOPA, {
            toValue: 1,
            duration: 201,

            useNativeDriver: false
        }).start();
    };
    return loading ? (
        <LoadingIndicator show={loading} />
    ) : (
        <View style={styles.container}>
            <View>
                {!isConnected && <NetworkIndicator />}
                {viewDetails == 'YES' ? (
                    <Animated.View
                        style={[
                            styles.fadingContainer,
                            {
                                left: fadeViewDetailsLEFT,
                                opacity: fadeViewDetailsOPA
                            }
                        ]}>
                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={styles.welcome}>{message}</Text>
                            <Text style={styles.SListheader}>HRT server</Text>
                            <Text style={styles.SListtitle}>
                                Confirmation # {transactionId?.split('-')[0]}
                            </Text>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <TouchableOpacity
                            style={styles.listitem}
                            // onPress={onDetailsSelect}
                            onPress={fadeIn}>
                            <View style={styles.listitemView}>
                                <Text style={styles.listitemText}>
                                    View details
                                </Text>
                                <Image
                                    source={assets.icons.angleBlack}
                                    style={styles.img}
                                />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                ) : (
                    <Animated.View
                        style={{
                            left: fadeDetailsLEFT,
                            opacity: fadeDetailsOPA
                        }}>
                        <TopNavbar
                            title="Request details"
                            RightIcon="NO"
                            imageBackOnPress={fadeOut}></TopNavbar>
                        <View
                            style={{
                                padding: '9%'
                            }}>
                            <View>
                                <Text style={styles.SListheader}>
                                    Confirmation
                                </Text>
                                <Text style={styles.SListtitle}>
                                    {transactionId}
                                </Text>
                                <View style={styles.bar}></View>
                            </View>
                            <View>
                                <Text style={styles.SListheader}>
                                    Created On
                                </Text>
                                <Text style={styles.SListtitle}>
                                    {new Date(createdAt).toLocaleString()}
                                </Text>
                                <View style={styles.bar}></View>
                            </View>
                            <View>
                                <Text style={styles.SListheader}>Message</Text>
                                <Text style={styles.SListtitle}>{message}</Text>
                                <View style={styles.bar}></View>
                            </View>
                        </View>
                    </Animated.View>
                )}
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                <TouchableOpacity
                    style={[
                        styles.decisionBox,
                        {
                            backgroundColor: '#e3242b',
                            padding: 10,
                            paddingLeft: 20
                        }
                    ]}
                    onPress={onReject}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.decisionBoxText}>Deny</Text>
                    </View>

                    <Image
                        source={assets.icons.crossWhite}
                        style={styles.iconBtn}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.decisionBox,
                        { backgroundColor: 'steelblue', padding: 10 }
                    ]}
                    onPress={onApprove}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.decisionBoxText}>Approve</Text>
                    </View>

                    <Image
                        source={assets.icons.tickWhite}
                        style={styles.iconBtn}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AuthProcess;
