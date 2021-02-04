import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    // SafeAreaView,
    // KeyboardAvoidingView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from '../../components';
import { TextInput } from '../../components';
import { TopNavbar } from '../../components';
import account from '../../util/sqlite/account';
import { Modal } from '../../components';
const AccountSettings = (props) => {
    const { id, refresh, componentId } = props;

    const onRemovePress = async () => {
        try {
            await account._delete(id);
            Navigation.popToRoot(componentId);
        } catch (error) {}
    };
    const createTwoButtonAlert = () =>
        Alert.alert(
        "Warning!",
        "This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: 'cancel',
            },
            { text: "OK", onPress: onRemovePress }
        ],
        { cancelable: false }
    );

    // contolled input
    const [firstName,setFirstName]= useState("");
    // end
    
    return (
        <View style={{flex:1,justifyContent:'space-between'}}>
            <TopNavbar title="Account Settings"></TopNavbar>
            <View style={styles.container}>

            <View style={{ margin: 0 }}></View>
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Server Name</Text>
                    <Text style={styles.titleIDText}>test.isd</Text>
                </View>
            </View>
            <View style={styles.middle}>
                {/* <KeyboardAvoidingView style={styles.title}>
                    <TextInput
                        placeholder=" acc name"
                        style={styles.titleCodeText}
                    />
                </KeyboardAvoidingView> */}
                {/* <View style={styles.title}>
                    <TextInput
                        placeholder=" acc name"
                        style={styles.titleCodeText}
                    />
                </View> */}
                <TextInput
                    placeholder="Account Name/Id"
                    style={styles.titleCodeText}
                />
            </View>
            <View style={styles.middle}>
                <TextInput
                        placeholder="Biometric"
                        style={styles.titleCodeText}
                    />
            </View>
            <View style={styles.bottom}>
                <Button
                    title="Remove Account"
                    style={styles.btn}
                    onPress={createTwoButtonAlert}
                />
                {/* <Modal style={styles.btn} /> */}
            </View>
            {/* <View style={{ margin: 5 }}></View> */}
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
        flex: 0.1
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

export default AccountSettings;
