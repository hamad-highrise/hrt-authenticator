import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

import { Topbar, NetworkIndicator } from '../../components';
import AccountList from './sectionList';
import { useAccounts } from './hooks';
import EmptyState from './EmptyState';
import screensIdentifiers from '../../navigation/screensId';
import styles from './accounts.styles';

const Main = () => {
    const navigation = useNavigation();
    const { accounts, isConnected } = useAccounts();
    console.warn(Config);

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

export default Main;
