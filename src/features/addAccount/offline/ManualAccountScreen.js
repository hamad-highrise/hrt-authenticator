import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Image,
    Switch
} from 'react-native';
import { Button, TopNavbar } from '../../../components';

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
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
        <View style={{ flex: 1}}>
            <TopNavbar title="Account By Code"></TopNavbar>

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
                            placeholder="Company name"
                            style={styles.listitemInput}
                        />
                        <View style={styles.bar}></View>
                    </View>
                    <View>
                        <Text style={styles.SListtitle}>Account</Text>
                        <View style={styles.listitemView}>
                            <TextInput
                                placeholder="Account"
                                style={styles.listitemInput}
                            />
                        </View>
                        <View style={styles.bar}></View>
                    </View>

                    <View>
                        <Text style={styles.SListtitle}>Account code</Text>
                        <View style={styles.listitemView}>
                            <TextInput
                                placeholder="Account code"
                                style={styles.listitemInput}
                            />
                        </View>
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
                    <View style={{flexDirection:'row', justifyContent: 'space-between', paddingVertical: 10}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'black',
                                marginTop: '5%',
                                marginLeft: 10,
                                marginRight: 10,
                            }}>
                            Time based
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#0f62fe' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Connect"
                        style={styles.btn}
                        onPress={() => alert('account added successfully')}
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
        backgroundColor: 'lightgrey',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    SListtitle: {
        fontSize: 16,
        color: '#424c58',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -10,
    },
    listitemInput:{
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
        marginTop: '10%',
    },
});

export default CodeAccount;
