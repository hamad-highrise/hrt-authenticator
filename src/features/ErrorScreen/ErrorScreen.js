import React from 'react';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import navigation from '../../navigation';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'IO Error,\n \n' + 'java.net.SocketTimeoutException: timeout'
});

const ErrorScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}></View>
            <Image
                style={styles.image}
                source={require('../../assets/images/ErrorScreen.png')}></Image>
            <View>
                <Text style={styles.welcome}>
                    Oops! Somthing went wrong here
                </Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
            <Button
                title="Back to accounts"
                onPress={() => navigation.goBack(props.componentId)}
                style={styles.btn}
            />
            <View style={{ marginBottom: 20 }}></View>
        </View>
    );
};
ErrorScreen.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

ErrorScreen.defaultProps = {
    title: 'HBL SAM'
};

export default ErrorScreen;

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
    instructions: {
        marginLeft: 20,
        color: 'black',
        marginBottom: 5,
        fontSize: 16
    },
    image: {
        width: 240,
        height: 200
    },
    btn: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    }
});
