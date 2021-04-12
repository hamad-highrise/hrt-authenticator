import React from 'react';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';

const ErrorScreen = ({ message, reset, ...props }) => {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}></View>
            <Image
                style={styles.image}
                source={require('../../assets/images/ErrorScreen2.png')}></Image>
            <View>
                <Text style={styles.welcome}>
                    Oops! Somthing went wrong here
                </Text>
                <Text>Default Message</Text>
                {alert(message)}
            </View>
            <Button title="OKAY" onPress={reset} style={styles.btn} />
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
