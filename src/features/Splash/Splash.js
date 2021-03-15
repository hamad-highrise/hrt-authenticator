import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';

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
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: Dimensions.get('window').height * 0.2
                }}>
                <Image
                    source={require('../../assets/images/highrise-logo.png')}
                    style={styles.image}
                />
                {/* <Text style={styles.welcome}>AUTHENTICATOR</Text> */}
            </View>
            <View>
                <Text style={{ color: 'black', textAlign: 'center' }}>
                    from
                </Text>
                <Text style={styles.instructions}>HIGHRISE</Text>
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
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: '#424c58',
        fontFamily: 'sans-serif-condensed'
    },
    instructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: -2,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 6,
        fontFamily: 'sans-serif-condensed'
    },
    Subinstructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: 2,
        fontFamily: 'sans-serif-condensed'
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: 75
    }
});
