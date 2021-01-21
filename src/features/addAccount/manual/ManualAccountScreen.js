import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { IconButton, Button, TextInput } from '../../../components';

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
                <KeyboardAvoidingView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        margin: 10
    },
    header: {
        flexDirection: 'row',
        height: 53,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30
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
        fontSize: 28,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        flex: 0.19,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    middle: {
        flex: 0.1
    },
    // titleCodeText: {
    //     color: 'maroon',
    //     fontSize: 28,
    //     // fontWeight: 'bold',
    //     borderBottomColor: 'orange',
    //     borderBottomWidth: 4,
    //     marginLeft: Dimensions.get('window').width * 0.04,
    //     marginRight: Dimensions.get('window').width * 0.08
    // },
    bottom: {
        flex: 0.3
    },
    titleTimerText: {
        color: 'lightgrey',
        fontSize: 36,
        borderColor: 'darkgrey',
        borderBottomWidth: 5,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: '#424c58',
        width: 150,
        height: 140,
        borderRadius: 100 / 2
    },
    titleTimerNameText: {
        fontSize: 12,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2
    },
    btn: {
        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    }
});

export default CodeAccount;
