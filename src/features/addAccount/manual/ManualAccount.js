import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Button, TextInput, TopNavbar, Topbar } from '../../../components';
import assets from '../../../assets';
import screensIdentifiers from '../../../navigation/screensId';
import { createAccount } from '../services';
import { accountActions } from '../../actions.public';
import styles from './manual.styles';

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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Topbar
                    title=""
                    topbarRight={{
                        visible: true,
                        onPress: () =>
                            navigation.navigate(screensIdentifiers.main),
                        image: {
                            source: assets.icons.cross,
                            width: '50%',
                            height: '50%'
                        }
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
                        <Text style={styles.instruction}>
                            4 - 50 numbers or letters.
                        </Text>
                    </View>

                    <View style={styles.bottom}>
                        <Button
                            label="Connect"
                            style={[
                                styles.btn,
                                !isDataValid
                                    ? { backgroundColor: 'lightgrey' }
                                    : {}
                            ]}
                            onPress={onAddPress}
                            rippleColor="#ACA8A8"
                            disabled={!isDataValid}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CodeAccount;
