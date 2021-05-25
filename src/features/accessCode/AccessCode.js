import React, { useRef } from 'react';
import { View, Text, Animated, Easing, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import {
    IconButton,
    LoadingIndicator,
    NetworkIndicator,
    Topbar
} from '../../components';
import styles from './code.styles';
import { AccessCodeFragment, SettingsFragment } from './fragments';
import { useAccessCode } from './hooks';
import { constants } from '../../global';

const AccessCode = (props) => {
    const navigation = useNavigation();
    const {
        otp,
        counter,
        fragment,
        onCodeSelect,
        onSettingsSelect,
        transactionCheck,
        removeAccount,
        loading,
        account,
        isConnected
    } = useAccessCode(props);

    var spinValue = useRef(new Animated.Value(0)).current;

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    });

    const onRefereshClick = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start((res) => {
            res.finished && spinValue.setValue(0);
        });
        transactionCheck();
    };

    return loading && account['type'] === constants.ACCOUNT_TYPES.SAM ? (
        <LoadingIndicator show={loading} />
    ) : (
        <View style={styles.container}>
            <Topbar
                title="Access Code"
                topbarLeft={{
                    visible: true,
                    onPress: navigation.goBack,
                    image: {
                        source: require('../../assets/icons/back_arrow_black.png'),
                        width: '60%',
                        height: '60%'
                    }
                }}
                topbarRight={{
                    visible: true,
                    child: (
                        <View style={{ width: 40, height: '100%' }}>
                            {account['type'] ===
                                constants.ACCOUNT_TYPES.SAM && (
                                <IconButton onPress={onRefereshClick}>
                                    <Animated.Image
                                        source={require('../../assets/icons/refresh_black.png')}
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
                            )}
                        </View>
                    )
                }}
            />
            {!isConnected && <NetworkIndicator />}
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{account.issuer}</Text>
                    <Text style={styles.titleIDText}>{account.name}</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.selectorContainer}>
                    <Pressable
                        onPress={onCodeSelect}
                        style={[
                            styles.selector,
                            styles.left,
                            fragment === 'CODE' && styles.selected
                        ]}>
                        <Text
                            style={[
                                styles.labelText,
                                fragment === 'CODE' && styles.selectedText
                            ]}>
                            Access Code
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={onSettingsSelect}
                        style={[
                            styles.selector,
                            styles.right,
                            fragment === 'SETTINGS' && styles.selected
                        ]}>
                        <Text
                            style={[
                                styles.labelText,
                                fragment === 'SETTINGS' && styles.selectedText
                            ]}>
                            Settings
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottom}>
                {fragment == 'CODE' ? (
                    <AccessCodeFragment
                        suspected={account['suspected']}
                        otp={otp}
                        counter={counter}
                    />
                ) : (
                    <SettingsFragment removeAccount={removeAccount} />
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
