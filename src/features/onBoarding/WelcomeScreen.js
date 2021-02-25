//All first start logic will go here
// e.g. database setup and notification channel creation
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import navigator from '../../navigation';
import { initiateDb } from './init-db';
import { setInitiated } from '../../util/utilities';
import { Button } from '../../components';

const WelcomeScreen = () => {
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        try {
            await initiateDb();
            await setInitiated();
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}></View>
            <View>
                <Text style={styles.welcome}>Welcome To Secure World!</Text>
            </View>
            <Button
                style={styles.btn}
                title="Continue"
                onPress={() => navigator.setMainRoot()}
            />
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
        backgroundColor: '#1db4c4',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    }
});
