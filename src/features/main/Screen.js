import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Topbar, NetworkIndicator } from '../../components';
import AccountList from './sectionList';
import { useAccounts } from './hooks';
import { useSelector } from 'react-redux';
import EmptyState from './EmptyState';
import screensIdentifiers from '../../navigation/screensId';

const Main = (props) => {
    const navigation = useNavigation();
    const { accounts } = useAccounts();
    const isConnected = useSelector(({ alert }) => alert.isConnected);
    const onAddAccount = useCallback(() => {
        navigation.navigate(screensIdentifiers.qrScan);
    }, [JSON.stringify(navigation)]);

    const onDeviceInfo = useCallback(() => {
        navigation.navigate(screensIdentifiers.deviceInfo);
    }, [JSON.stringify(navigation)]);

    return (
        <View style={styles.container}>
            {accounts?.length ? (
                <Topbar
                    title="HRT Security Verify"
                    topbarLeft={{
                        visible: true,
                        onPress: onDeviceInfo,
                        image: {
                            source: require('../../assets/icons/settings_outlined.png'),
                            width: '70%',
                            height: '70%'
                        }
                    }}
                    topbarRight={{
                        visible: true,
                        onPress: onAddAccount,
                        image: {
                            source: require('../../assets/icons/qr_code.png')
                        }
                    }}
                />
            ) : null}
            <View style={{ marginLeft: 5, marginRight: 5, marginTop: 0 }} />
            {!isConnected && <NetworkIndicator />}
            {accounts?.length ? (
                <AccountList accounts={accounts} />
            ) : (
                <EmptyState />
            )}
        </View>
    );
};

Main.options = {
    topBar: {
        visible: false
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center',
        marginLeft: 20
    },
    titleText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    }
});

export default Main;
