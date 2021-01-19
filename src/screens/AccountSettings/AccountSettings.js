import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
    // TextInput,
    // SafeAreaView,
    // KeyboardAvoidingView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { IconButton } from '../../components';
import { Button } from '../../components';
import account from '../../util/sqlite/account';

const AccountSettings = (props) => {
    const { id, refresh, componentId } = props;

    const onRemovePress = async () => {
        try {
            await account._delete(id);
            Navigation.popToRoot(componentId);
        } catch (error) {}
    };
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
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('account settings')}>
                        <Image
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 9,
                                    marginTop: 12,
                                    width: 25,
                                    height: 30
                                }
                            ]}
                        />
                    </IconButton>
                </View>
            </View>

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
            </View>

            <View style={styles.bottom}>
                <Button
                    title="Remove Account"
                    style={styles.btn}
                    onPress={onRemovePress}
                />
                <View style={{ margin: 10 }} />
            </View>
            <View style={{ margin: 5 }}></View>
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

export default AccountSettings;
