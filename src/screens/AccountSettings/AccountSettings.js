import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    // SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from '../../components';
// import { TextInput } from '../../components';
import { TopNavbar } from '../../components';
import account from '../../util/sqlite/account';
import { Modal } from '../../components';

const AccountSettings = (props) => {
    const onPressHandlerBiometricEdits = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.BiometricEdits',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const { id, refresh, componentId } = props;

    const onRemovePress = async () => {
        try {
            await account._delete(id);
            Navigation.popToRoot(componentId);
        } catch (error) {}
    };
    const createTwoButtonAlert = () =>
        Alert.alert(
            'Warning!',
            'This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: onRemovePress }
            ],
            { cancelable: false }
        );

    // contolled input
    const [firstName, setFirstName] = useState('');
    // end

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TopNavbar title="Account Settings"></TopNavbar>
 
            <View style={styles.container}>
                <View style={{ marginTop: -40 }}></View>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Server Name</Text>
                        <Text style={styles.titleIDText}>test.isd</Text>
                    </View>
                </View>
                <KeyboardAvoidingView style={styles.middle} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    {/* <TextInput
                        placeholder="Account Name/Id"
                        style={styles.titleCodeText}
                    /> */}
                    {/* <Text style={{marginTop:-35,marginBottom:15, fontSize:16, fontWeight:'bold',marginLeft:6, alignSelf:'center'}}>ACCOUNT INFO</Text> */}
                    <TouchableOpacity
                        style={styles.listitem}
                        onPress={() => alert('zxcvbnm')}>
                        <View style={styles.listitemView}>
                            <TextInput
                                placeholder="Account Name"
                                style={{
                                    marginBottom: -20,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginLeft: -10
                                }}
                            />
                            <Image
                                source={require('../../assets/icons/edit2.png')}
                                style={styles.imgg}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* </View>
                <View style={styles.middle}> */}
                    {/* <TextInput
                            placeholder="Biometric"
                            style={styles.titleCodeText}
                        /> */}
                    <TouchableOpacity
                        style={styles.listitem}
                        onPress={onPressHandlerBiometricEdits}>
                        <View style={styles.listitemView}>
                            <Text style={styles.listitemText}>Biometric</Text>
                            <Image
                                source={require('../../assets/icons/backarrowinvert.png')}
                                style={styles.img}
                            />
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <View style={styles.bottom}>
                    <Button
                        title="Remove Account"
                        style={styles.btn}
                        onPress={createTwoButtonAlert}
                    />
                    <Modal style={styles.btnInvert} title="WARNING" subtitle="This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?"/>
                    <Text
                        style={{
                            marginTop: 30,
                            alignSelf: 'center',
                            fontSize: 14
                        }}>
                        Removing this account may prevent you from verifying in
                        the future.
                    </Text>
                </View>
            </View>
        </View>
    );
};

AccountSettings.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'lightgrey',
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
        fontSize: 36,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        flex: 0.2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    titleIDText: {
        fontSize: 24
    },
    middle: {
        flex: 0.12
    },
    bottom: {
        flex: 0.3
    },
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
    listitem: {
        padding: 13,
        backgroundColor: '#1c9db208',
        borderBottomWidth: 2,
        borderColor: '#1c9db2',
        justifyContent: 'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c58'
    },
    img: {
        width: 30,
        height: 28,
        transform: [{ rotate: '180deg' }],
        backgroundColor: '#e57f01',
        borderRadius: 10
    },
    imgg: {
        width: 25,
        height: 25
    }
});

export default AccountSettings;
