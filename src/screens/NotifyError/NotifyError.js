import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'IO Error,\n \n' +
        'java.net.SocketTimeoutException: timeout'
});

const NotifyError = (props) => {
    const onPressBackToAccounts = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.MainScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    return (
        <View style={styles.container}>
            <View style={{marginTop:20}}></View>
            <Image style={styles.image} source={require('../../assets/images/ErrorScreen.png')}></Image>
            <View>
                <Text style={styles.welcome}>Oops! Somthing went wrong here</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
            <Button
                title="Back to account"
                onPress={onPressBackToAccounts}
                style={styles.btn}
            />
            <View style={{marginBottom:20}}></View>
        </View>
    );
};
NotifyError.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyError.defaultProps = {
    title: 'HBL SAM'
};

export default NotifyError;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight:25,
        paddingLeft:25,
    },
    welcome: {
        fontSize: 32,
        // textAlign: 'center',
        marginLeft:20,
        margin: 10,
        color: 'black',
        fontWeight:'bold',
    },
    instructions: {
        // textAlign: 'center',
        marginLeft:20,
        color: 'black',
        marginBottom: 5,
        fontSize:16,
        // paddingRight:25,
        // paddingLeft:25,
    },
    image:{
        width:240,
        height:200,

    },
    btn: {
        backgroundColor: '#ff8544',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'white',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
});