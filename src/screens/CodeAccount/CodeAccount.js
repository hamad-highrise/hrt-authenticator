import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { Button } from '../../components';
import { TextInput } from '../../components';
import { TopNavbar } from '../../components';

const CodeAccount = (props) => {
    return (
        <View style={{flex:1,justifyContent:'space-between'}}>
            <TopNavbar title="Account By Code"></TopNavbar>

            <View style={styles.container}>

                {/* <View style={{ margin: 10 }}></View> */}
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Manually connect your account</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Account name"
                        style={styles.titleCodeText}
                    />
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
                    <View style={{ margin: 35 }} />
                    <Button
                        title="Add Account"
                        style={styles.btn}
                        onPress={()=> alert('account added successfully')}
                    />
                    <View style={{ marginBottom: 40 }} />
                </View>
            </View>
        </View>
    );
};

CodeAccount.options = {};

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
       marginBottom: 40,
    },
    middle: {
        // flex: 1
        margin: 7,
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 28,
        // fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        marginLeft: Dimensions.get('window').width * 0.04,
        marginRight: Dimensions.get('window').width * 0.08
    },
    // bottom: {
    //     flex: 0.3
    // },
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
