import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Image, Button } from 'react-native';


const Splash = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#555" />
            <Image source={require('../../assets/images/highrise-logo.png')}></Image>
            <Text style={styles.welcome}>No Account Yet !</Text>
            <Text style={styles.instructions}>Add your device and see them here</Text>
            <Button />
        </View>
    );
};
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    instructions: {
        textAlign: 'center',
        color: 'maroon',
        marginBottom: 5
    }
});