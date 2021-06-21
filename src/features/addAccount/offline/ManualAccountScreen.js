import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, TextInput, TopNavbar } from '../../../components';
import screensIdentifiers from '../../../navigation/screensId';
import { createAccount } from '../servicesX';
import { accountActions } from '../../actions.public';
import { useDispatch } from 'react-redux';

const CodeAccount = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        name: '',
        issuer: '',
        secret: ''
    });

    const isDataValid = useMemo(
        () => account.name && account.issuer && account.secret.length >= 4,
        [account.issuer, account.name, account.secret]
    );

    const onChangeHandler = (name) => (value) => {
        setAccount((account) => ({
            ...account,
            [name]: value
        }));
    };

    const onAddPress = async () => {
        try {
            if (isDataValid) {
                await createAccount({ account: { ...account, type: 'TOTP' } });
                alert('Account Added');
                dispatch(accountActions.initiateAccounts());
                navigation.navigate(screensIdentifiers.main);
            } else alert('Invalid Data or empty fields');
        } catch (error) {
            alert('Unable to create account');
            navigation.navigate(screensIdentifiers.main);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TopNavbar
                title="Account By Code"
                imageBackOnPress={() => {
                    // navigator.goBack(props.componentId);
                    navigation.navigate(screensIdentifiers.main);
                }}
            />

            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Manually connect your account
                        </Text>
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={styles.SListtitle}>Company name</Text>
                        <TextInput
                            placeholder="e.g. Highrise Technologies"
                            style={styles.listitemInput}
                            onChangeText={onChangeHandler('issuer')}
                        />
                        <View style={styles.bar}></View>
                    </View>
                    <View>
                        <Text style={styles.SListtitle}>Account</Text>
                        <TextInput
                            placeholder="e.g. John"
                            style={styles.listitemInput}
                            onChangeText={onChangeHandler('name')}
                        />
                        <View style={styles.bar}></View>
                    </View>

                    <View>
                        <Text style={styles.SListtitle}>Account code</Text>

                        <TextInput
                            placeholder="Secret"
                            style={styles.listitemInput}
                            onChangeText={onChangeHandler('secret')}
                            autoCapitalize
                        />
                        <View style={styles.bar}></View>
                    </View>
                    <Text
                        style={{
                            fontSize: 15,
                            color: 'grey',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: -20
                        }}>
                        4 - 50 numbers or letters.
                    </Text>
                </View>

                <View style={styles.bottom}>
                    <Button
                        label="Connect"
                        style={[
                            styles.btn,
                            !isDataValid ? { backgroundColor: 'lightgrey' } : {}
                        ]}
                        onPress={onAddPress}
                        rippleColor="#ACA8A8"
                        disabled={!isDataValid}
                    />
                </View>
            </View>
        </View>
    );
};

CodeAccount.options = {
    topBar: {
        visible: false
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10
    },
    title: {
        marginLeft: 5
    },
    titleText: {
        color: '#424c58',
        fontSize: 32,
        lineHeight: 45,
        marginTop: -10
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        marginBottom: 25
    },
    middle: {
        margin: 7,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center'
    },
    btn: {
        alignSelf: 'center'
    },
    SListtitle: {
        fontSize: 16,
        color: '#424c58',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -10
    },
    listitemInput: {
        marginBottom: -15,
        fontSize: 16,
        marginLeft: 20
    },
    bar: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        width: '95%',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    imgg: {
        width: 25,
        height: 25
    },
    bottom: {
        marginTop: '25%'
    }
});

export default CodeAccount;
