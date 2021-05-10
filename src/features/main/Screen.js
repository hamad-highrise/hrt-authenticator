import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from '../../components';
import AccountList from './sectionList';
import { useAccounts } from './hooks';
import { useSelector } from 'react-redux';
import EmptyState from './EmptyState';
import screensIdentifiers from '../../navigation/screensId';

const Main = (props) => {
    const navigation = useNavigation();
    const { accounts } = useAccounts(props.componentId);
    const isConnected = useSelector(({ alert }) => alert.isConnected);
    const onAddAccount = useCallback(() => {
        navigation.navigate(screensIdentifiers.qrScan);
    }, [props.componentId]);

    const onDeviceInfo = useCallback(() => {
        navigation.navigate(screensIdentifiers.deviceInfo);
    }, [props.componentId]);

    return (
        <View style={styles.container}>
            {accounts?.length ? (
                <View style={styles.header}>
                    <View>
                        <IconButton onPress={onDeviceInfo}>
                            <Image
                                source={require('../../assets/icons/settings.png')}
                                style={[
                                    styles.iconBtn,
                                    {
                                        marginLeft: 5,
                                        marginTop: 2
                                    }
                                ]}
                            />
                        </IconButton>
                    </View>

                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Fidelity Security Verify
                        </Text>
                    </View>

                    <View>
                        <IconButton onPress={onAddAccount}>
                            <Image
                                source={require('../../assets/icons/qr_code.png')}
                                style={{ marginLeft: -10, marginTop: -3 }}
                            />
                        </IconButton>
                    </View>
                </View>
            ) : null}
            <View style={{ marginLeft: 5, marginRight: 5, marginTop: 0 }} />
            {!isConnected && (
                <View
                    style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontFamily: 'monospace', color: 'white' }}>
                        No Internet
                    </Text>
                </View>
            )}
            {accounts?.length ? (
                <AccountList
                    accounts={accounts}
                    componentId={props.componentId} // for the sake of navigation
                />
            ) : (
                <EmptyState {...props} />
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
        // backgroundColor: '#ff8100'
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

const stylesX = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        marginLeft: 50,
        marginTop: 20,
        marginRight: 30,
        marginBottom: 30,
        lineHeight: 35
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.3,
        alignItems: 'center'
    },
    btnInvert: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    title: {
        marginLeft: 20
    }
});

export default Main;
