import React from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { IconButton, Button, TextInput } from '../../../components';
import styles from './styles';

const CodeAccount = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('Go to Main screen')}>
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={{
                                width: 25,
                                height: 35,
                                marginLeft: 6,
                                marginTop: 10
                            }}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleMainText}>Account Settings</Text>
                </View>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}></View>
            </View>

            <View style={{ margin: 9 }}></View>
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        Manually connect your account
                    </Text>
                </View>
            </View>
            <View style={styles.middle}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
                    <TextInput
                        placeholder="Account name"
                        style={styles.titleCodeText}
                    />
                </KeyboardAvoidingView>
            </View>
            <View style={styles.middle}>
                <TextInput
                    placeholder="Company name"
                    style={styles.titleCodeText}
                />
            </View>
            <View style={styles.middle}>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Secret Code"
                    style={styles.titleCodeText}
                />
            </View>

            <View style={styles.bottom}>
                <View style={{ margin: 25 }} />
                <Button
                    title="Remove Account"
                    style={styles.btn}
                    onPress={() => alert('remove account successfully')}
                />
            </View>
        </View>
    );
};

CodeAccount.options = {};

export default CodeAccount;
