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
import { CodeTab, SettingsTab } from './tabs';
import { useTabs, useTotp } from './hooks';
import { constants, hooks } from '../../global';
import assets from '../../assets';
import styles from './code.styles';

const { useSelected, useUtils } = hooks;

const AccessCode = (props) => {
    const navigation = useNavigation();
    const { otp, counter } = useTotp();
    const { tabs, currentTab, setCodeTab, setSettingsTab } = useTabs();
    const { loading, error, isConnected } = useUtils();
    const account = useSelected();
    // const {
    //     transactionCheck,
    //     removeAccount,
    //     loading,
    //     account,
    //     isConnected
    // } = useAccessCode(props);

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
        // transactionCheck();
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
                        source: assets.icons.backArrow,
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
                                        source={assets.icons.refresh}
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
                        onPress={setCodeTab}
                        style={[
                            styles.selector,
                            styles.left,
                            currentTab === tabs.CODE && styles.selected
                        ]}>
                        <Text
                            style={[
                                styles.labelText,
                                currentTab === tabs.CODE && styles.selectedText
                            ]}>
                            Access Code
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={setSettingsTab}
                        style={[
                            styles.selector,
                            styles.right,
                            currentTab === tabs.SETTINGS && styles.selected
                        ]}>
                        <Text
                            style={[
                                styles.labelText,
                                currentTab === tabs.SETTINGS &&
                                    styles.selectedText
                            ]}>
                            Settings
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottom}>
                {currentTab === tabs.CODE ? (
                    <CodeTab
                        suspected={account['suspected']}
                        otp={otp}
                        counter={counter}
                    />
                ) : (
                    // <SettingsFragment removeAccount={removeAccount} />
                    <SettingsTab removeAccount={() => alert('remove')} />
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

export default AccessCode;
