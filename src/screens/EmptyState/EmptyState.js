import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'This a Empty State Screen' +
        'Work in progress. Sorry for inconvinience'
});
const Splash = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
            <Text style={styles.welcome}>Welcome to Empty State Screen!</Text>
            <Text style={styles.instructions}>To get started, edit EmptyState.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: 5
    }
});
