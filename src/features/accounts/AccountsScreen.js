import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Topbar, NetworkIndicator } from '../../components';
import assets from '../../assets';
import AccountList from './sectionList';
import { useAccounts } from './hooks';
import EmptyState from './EmptyState';
import screensIdentifiers from '../../navigation/screensId';
import styles from './accounts.styles';
import { values } from '../../global';

const Main = () => {
    const navigation = useNavigation();
    const { accounts, isConnected } = useAccounts();

    const onAddAccount = useCallback(() => {
        navigation.navigate(screensIdentifiers.qrScan);
    }, [JSON.stringify(navigation)]);

    const onDeviceInfo = useCallback(() => {
        // navigation.navigate(screensIdentifiers.deviceInfo);
        navigation.navigate(screensIdentifiers.complete, {
            serviceName: 'TEST'
        });
    }, [JSON.stringify(navigation)]);

    return (
        <View style={styles.container}>
            {accounts?.length ? (
                <Topbar
                    title={values.APP_NAME}
                    topbarLeft={{
                        visible: true,
                        onPress: onDeviceInfo,
                        image: {
                            source: assets.icons.setting,
                            width: '70%',
                            height: '70%'
                        }
                    }}
                    topbarRight={{
                        visible: true,
                        onPress: onAddAccount,
                        image: {
                            source: assets.icons.qrCode
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
