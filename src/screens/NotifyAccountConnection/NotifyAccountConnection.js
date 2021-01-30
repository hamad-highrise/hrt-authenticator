import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';
const NotifyAccountConnection = ({props,title}) => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/images/connection.png')}></Image>
            <Text style={styles.welcome}>Account Added !</Text>
            <Text style={styles.instructions}>This device and your {title} account are now conencted. </Text>
            {/* <Text style={styles.instructions}>{instructions}</Text> */}
        </View>
    );
};
NotifyAccountConnection.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyAccountConnection.defaultProps = {
    title: 'HBL SAM'
};

export default NotifyAccountConnection;

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
        marginBottom: 5,
        fontSize:20,
        paddingRight:25,
        paddingLeft:25,
    },
    image:{
        width:157,
        height:157,
    }
});