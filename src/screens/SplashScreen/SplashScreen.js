import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Image, Dimensions } from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});
const Splash = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
            <View style={{alignItems:'center', paddingTop:Dimensions.get('window').height * 0.2}}>
                <Image
                    source={require('../../assets/images/highrise-logo.png')}
                    style={styles.image}
                />
                <Text style={styles.welcome}>AUTHENTICATOR</Text>
            </View>
            <View>
                <Text style={styles.instructions}>H I G H R I S E</Text>
                <Text style={styles.Subinstructions}>TECHNOLOGIES</Text>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4F6D7A'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight:'bold',
        color: '#F5FCFF',
        fontFamily:'sans-serif-condensed',
    },
    instructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: -2,
        fontSize:14,
        fontWeight:'bold',
        textTransform:'uppercase',
    },
    Subinstructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: 10,
        fontSize:12,
    },
    image: {
        width:75,
        height: 75,

    }
});
