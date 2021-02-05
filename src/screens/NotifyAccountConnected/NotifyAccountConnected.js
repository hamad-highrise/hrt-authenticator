import React from 'react';
import {Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const NotifyAccountConnected = ({props,title}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/images/tick.png')}></Image>
            <View>
                <Text style={styles.instructions}>This device and your {title} account are now conencted.</Text>
            </View>
        </View>
    );
};
NotifyAccountConnected.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyAccountConnected.defaultProps = {
    title: 'Example'
};

export default NotifyAccountConnected;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight:25,
        paddingLeft:25,
    },
    instructions: {
        textAlign: 'center',
        marginLeft:20,
        color: 'black',
        marginBottom: 5,
        fontSize:18,
        paddingRight:26,
    },
    image:{
        width:150,
        height:150,
    },
});