import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from '../../components';
import accountQ from '../../util/sqlite/account';
import secret from '../../util/sqlite/secret';

const AccountForm = () => {
    const [account, setAccount] = useState({
        name: '',
        issuer: '',
        secret: ''
    });

    const onAddClick = async () => {
        if (account.issuer && account.name && account.secret) {
            try {
                await accountQ.create({
                    name: account.name,
                    issuer: account.issuer
                });
                alert('account added');
            } catch (error) {
                alert(error);
            }
        } else {
            alert('Fields Empy');
        }
    };

    const onChangeHandler = (name) => (value) => {
        setAccount((account) => ({
            ...account,
            [name]: value
        }));
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Enter Account Manually</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={account.name}
                    onChangeText={onChangeHandler('name')}
                />
                <TextInput
                    style={styles.input}
                    value={account.issuer}
                    onChangeText={onChangeHandler('issuer')}
                />

                <TextInput
                    style={styles.input}
                    value={account.secret}
                    onChangeText={onChangeHandler('secret')}
                    autoCapitalize="characters"
                />
                <Text>4-50 Characters</Text>
                <Button title="Add" onPress={onAddClick} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        width: 250,
        margin: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30
    }
});

export default AccountForm;
