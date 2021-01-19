import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { IconButton } from '../../components';
import { Navigation } from 'react-native-navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import ListItem from './components/ListItem/ListItem';
import account from '../../util/sqlite/account';

const Main = (props) => {
    const [accounts, setAccounts] = useState([]);

    const getAllAccounts = async () => {
        try {
            const results = await account.getAllAccounts();
            let mAccounts = [];
            for (let i = 0; i < results[0].rows.length; i++) {
                mAccounts.push(results[0].rows.item(i));
            }
            setAccounts(mAccounts);
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
                        title: {
                            text: 'Add Account'
                        }
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <IconButton onPress={() => alert('device info')}>
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
            <FlatList
                style={{ margin: 5 }}
                data={accounts}
                renderItem={({ item: accounts }) => (
                    <ListItem
                        item={accounts}
                        onPress={onPressHandlerAccessCode}
                    />
                )}
                keyExtractor={(item) => '' + item['account_id']}
            />
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
    }
});

export default Main;
