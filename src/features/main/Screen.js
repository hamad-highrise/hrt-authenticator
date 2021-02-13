import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import navigation from '../../navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import accountQueries from './queries';
import { IconButton } from '../../components';
import AccountList from './sectionList';

const Main = (props) => {
    const [accounts, setAccounts] = useState([]);

    const getAllAccounts = async () => {
        try {
            const mAccounts = await accountQueries.getAll();
            if (mAccounts.length > 0) {
                setAccounts(mAccounts);
            } else {
                // navigation.goTo(
                //     props.componentId,
                //     navigation.screenIds.emptyState
                // );
                alert('No Accounts');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    useNavigationComponentDidAppear(
        () => {
            getAllAccounts();
        },
        { componentId: props.componentId }
    );

    useEffect(() => {
        getAllAccounts();
    }, []);

    const onPressHandler = () => {
        navigation.goTo(props.componentId, navigation.screenIds.addAccount);
    };
    const onItemPress = (id, name, issuer, secret) => {
        navigation.goTo(props.componentId, navigation.screenIds.accessCode, {
            id,
            name,
            issuer,
            secret
        });
    };
    const onPressHandlerAccessCode = () => {
        navigation.goTo(props.componentId, navigation.screenIds.accessCode);
    };
    const onPressHandlerDeviceInfo = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.DeviceInfoScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };

    const sampleAccountData = [
        { account_id: 0, account_name: 'local', issuer: 'server', type: 'SAM' },
        {
            account_id: 1,
            account_name: 'local',
            issuer: 'server',
            type: 'TOTP'
        },
        {
            account_id: 2,
            account_name: 'local',
            issuer: 'server',
            type: 'TOTP'
        },
        { account_id: 3, account_name: 'hamad', issuer: 'server', type: 'SAM' },
        { account_id: 4, account_name: 'local', issuer: 'server', type: 'SAM' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandlerAccessCode}>
                        <Image
                            source={require('../../assets/icons/settings2.png')}
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
                    <Text style={styles.titleText}>Accounts</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image
                            source={require('../../assets/icons/add.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View>
            </View>
            <View style={{ marginLeft: 5, marginRight: 5 }} />
            <AccountList accounts={accounts} onListItemPress={onItemPress} />
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
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    title: {
        marginLeft: 20
    },
    titleText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    SListitem: {
        backgroundColor: 'white',
        padding: 23,
        marginVertical: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 28
    },
    SListheader: {
        fontSize: 26,
        padding: 10,
        backgroundColor: '#adb6c6'
    },
    SListtitle: {
        fontSize: 24,
        color: '#b5b6bd'
    }
});

export default Main;

{
    /* <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandlerDeviceInfo}>
                        <Image
                            source={require('../../assets/icons/settings2.png')}
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
                    <Text style={styles.titleText}>Accounts</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image
                            source={require('../../assets/icons/add.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View>
            </View> */
}
