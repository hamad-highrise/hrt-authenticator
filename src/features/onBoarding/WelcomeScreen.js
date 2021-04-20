//All first start logic will go here
// e.g. database setup and notification channel creation
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import navigator from '../../navigation';
import { initiateDb } from './init-db';
import { setInitiated } from '../../native-services/utilities';
import { Button } from '../../components';

const WelcomeScreen = () => {
    const init = async () => {
        try {
            await initiateDb();
            await setInitiated();
        } catch (error) {
            console.warn(error);
            alert('An error occured while initializing app.');
        }
    };
    const onPress = async () => {
        await init();
        navigator.setMainRoot();
    };
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }} />
            <View>
                <Text style={styles.welcome}>Welcome To Secure World!</Text>
            </View>
            <Button label="Continue" onPress={onPress} />
            <View style={{ marginBottom: -50 }}></View>
        </View>
    );
};

WelcomeScreen.options = {
    topBar: {
        visible: false
    }
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 25,
        paddingLeft: 25
    },
    welcome: {
        fontSize: 32,
        marginLeft: 20,
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7
    }
});
