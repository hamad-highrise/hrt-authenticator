import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    // TextInput
} from 'react-native';
import { Button } from '../../components';
import { TextInput } from '../../components';
import { TopNavbar } from '../../components';

const CodeAccount = (props) => {
    const [text, setText] = useState('');
    const [textC, setTextC] = useState('');
    const [textS, setTextS] = useState('');

    return (
        <View style={{flex:1,justifyContent:'space-between'}}>
            <TopNavbar title="Account By Code"></TopNavbar>

            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Manually connect your account</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Account name"
                        onChangeText={text => setText(text)}
                    />
                    <Text style={{paddingLeft: 10, fontSize:13, paddingTop:20 }}>
                        {(text.length > 8 || text.length == 0 ) ? '✖️' : '✔️'}
                    </Text>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Company name"
                        onChangeText={text => setTextC(text)}
                    />
                    <Text style={{paddingLeft: 10, fontSize:13, paddingTop:20}}>
                        {(textC.length > 8 || textC.length == 0 ) ? '✖️' : '✔️'}
                    </Text>
                </View>

                <View style={styles.middle}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Secret Code"
                        onChangeText={text => setTextS(text)}
                    />
                    <Text style={{ paddingLeft: 10, fontSize:13, paddingTop:20}}>
                        {(textS.length > 8 || textS.length == 0 ) ? '✖️' : '✔️'}
                    </Text>
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
        margin: 7,
        flexDirection: 'row',
        width: Dimensions.get('window').width* 0.8,
        // backgroundColor:'blue',
        justifyContent:'center',

    },
    // bottom: {
    //     flex: 0.3
    // },
    btn: {
        backgroundColor: '#ff8544',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'white',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
});

export default CodeAccount;
