import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    SectionList
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import navigation from '../../navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import Item from './Item';
import accountQueries from './queries';

const Main = (props) => {
    const [accounts, setAccounts] = useState([]);

    const getAllAccounts = async () => {
        try {
            const mAccounts = await accountQueries.getAll();
            if (mAccounts.length > 0) {
                setAccounts(mAccounts);
            } else {
                navigation.goTo(
                    props.componentId,
                    navigation.screenIds.emptyState
                );
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
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AddAccountScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerAccessCode = (id, name, issuer, secret) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccessCodeScreen',
                passProps: {
                    id: id,
                    name: name,
                    issuer: issuer,
                    secret: secret
                },
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
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

    const sample = [
        {
            title: 'MMFA Acconts',
            data: ['HBL SAM', 'HBL PIM', 'HBL Support']
        },
        {
            title: 'Sides',
            data: ['French Fries', 'Onion Rings', 'Fried Shrimps']
        }
    ];

    // const DATA = accounts.reduce(
    //     ([mmfa, totp], account) => {
    //         account.type === 'SAM'
    //             ? mmfa.data.push(account)
    //             : totp.data.push(account);
    //     },
    //     [
    //         { title: 'MMFA Accounts', data: [] },
    //         { title: 'TOTP Accounts', data: [] }
    //     ]
    // );

    // const DATA = accounts.reduce((prev, account) => {
    //     let [mmfa, totp] = prev;
    //     account.type === 'SAM'
    //         ? mmfa.data.push(account)
    //         : totp.data.push(account);
    //     return [mmfa, totp];
    // }, []);

    return (
        <View style={styles.container}>
            {/* <View style={{ marginLeft: 5, marginRight: 5 }} /> */}
            <SafeAreaView style={styles.container}>
                <SectionList
                    style={{ backgroundColor: '#adb6c6' }}
                    sections={sample}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.SListheader}>{title}</Text>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

Main.options = {};

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
