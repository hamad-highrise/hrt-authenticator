import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, TextInput, TopNavbar } from '../../../components';
import { createAccount } from '../services';

const CodeAccount = (props) => {
    const [account, setAccount] = useState({
        name: '',
        issuer: '',
        secret: ''
    });

    const onChangeHandler = (name) => (value) => {
        setAccount((account) => ({
            ...account,
            [name]: value
        }));
    };

    const onAddPress = async () => {
        try {
            await createAccount({ account });
        } catch (error) {
            alert('Error');
        } finally {
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TopNavbar title="Account By Code" />

            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Manually connect your account
                        </Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Account name"
                        onChangeText={onChangeHandler('name')}
                    />
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontSize: 13,
                            paddingTop: 20
                        }}></Text>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Company name"
                        onChangeText={onChangeHandler('issuer')}
                    />
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontSize: 13,
                            paddingTop: 20
                        }}></Text>
                </View>

                <View style={styles.middle}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Secret Code"
                        onChangeText={onChangeHandler('secret')}
                    />
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontSize: 13,
                            paddingTop: 20
                        }}></Text>
                </View>

                <View style={styles.bottom}>
                    <View style={{ margin: 35 }} />
                    <Button
                        title="Add Account"
                        style={styles.btn}
                        onPress={onAddPress}
                    />
                    <View style={{ marginBottom: 40 }} />
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
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 30,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 40,
        marginBottom: 40
    },
    middle: {
        margin: 7,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    }
});

export default CodeAccount;
