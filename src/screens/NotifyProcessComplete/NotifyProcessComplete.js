import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';
const NotifyProcessComplete = ({props,title}) => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/icons/tick.png')}></Image>
            <Text style={styles.welcome}>You're done!</Text>
            <Text style={styles.instructions}>You can now use this app with your {title} account to verify your identity</Text>
            {/* <Text style={styles.instructions}>{instructions}</Text> */}
        </View>
    );
};
NotifyProcessComplete.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyProcessComplete.defaultProps = {
    title: 'HBL SAM'
};

export default NotifyProcessComplete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'left',
        margin: 10,
        color: 'black',
    },
    instructions: {
        textAlign: 'center',
        color: 'maroon',
        marginBottom: 5,
        fontSize:18,
        paddingRight:25,
        paddingLeft:25,
    },
    image:{
        width:157,
        height:157,
    }
});