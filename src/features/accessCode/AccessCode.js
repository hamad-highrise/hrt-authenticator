import React, { useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

import { IconButton } from '../../components';
import navigator from '../../navigation';
import PropTypes from 'prop-types';
import styles from './styles';
import { AccessCodeFragment, SettingsFragment } from './fragments';
import { removeAccount } from '../services';
// import useAccessCode from './useAccessCode';
import { useAccessCode } from './hooks';

const AccessCode = (props) => {
    // let transInterval;
    const {
        otp,
        counter,
        fragment,
        onCodeSelect,
        onSettingsSelect,
        transactionCheck
    } = useAccessCode(props);

    var spinValue = useRef(new Animated.Value(0)).current;

    const onBackPress = () => {
        navigator.goBack(props.componentId);
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const onRefereshClick = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start((res) => {
            if (res.finished) {
                spinValue.setValue(0);
            }
        });
        try {
            transactionCheck();
        } catch (error) {
            alert(error);
        }
    };

    const handleRemoveAccount = async () => {
        try {
            const result = await removeAccount({
                accId: props.accId,
                type: props.type
            });
            navigator.goToRoot(props.componentId);
            alert(JSON.stringify(result));
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View
                    style={{ height: 52 }}
                    style={{ transform: [{ rotate: '180deg' }] }}>
                    <IconButton onPress={onBackPress}>
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
                    <Text style={styles.titleMainText}>Access Code</Text>
                </View>
                <View style={{ height: 52 }}>
                    <IconButton onPress={onRefereshClick}>
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
