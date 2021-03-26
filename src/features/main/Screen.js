import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import navigation from '../../navigation';
import { IconButton } from '../../components';
import AccountList from './sectionList';
import useAccounts from './useAccounts';

const Main = (props) => {
    const { accounts, error } = useAccounts(props.componentId);

    const onPressHandler = () => {
        navigation.goTo(props.componentId, navigation.screenIds.addAccount);
    };
    const onItemPress = ({
        account_id: accId,
        account_name: name,
        issuer,
        secret,
        type,
        transaction
    }) => {
        if (transaction && transaction.available) {
            navigation.goTo(
                props.componentId,
                navigation.screenIds.authTransaction,
                {
                    accId,
                    message: transaction.displayMessage,
                    endpoint: transaction.requestUrl,
                    createdAt: transaction.createdAt,
                    transactionId: transaction.transactionId
                }
            );
        } else
            navigation.goTo(
                props.componentId,
                navigation.screenIds.accessCode,
                {
                    accId,
                    name,
                    issuer,
                    secret,
                    type,
                    transaction
                }
            );
    };
    const onPressHandlerAccessCode = () => {
        navigation.goTo(props.componentId, navigation.screenIds.deviceInfo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandlerAccessCode}>
                        <Image
                            source={require('../../assets/icons/settings2black.png')}
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
                    <Text style={styles.titleText}>HRT Security Verify</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image
                            source={require('../../assets/icons/qr_code2.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View>
            </View>
            <View style={{ marginLeft: 5, marginRight: 5, marginTop: 0 }} />
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
        justifyContent: 'space-between'
    },
    title: {
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
    },
});

export default Main;
