import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';
const NotifyProcessComplete = ({props,title}) => {
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
            <View style={{marginTop:15}}></View>
            <Image style={styles.image} source={require('../../assets/images/medalSucess.png')}></Image>
            <View>
                <Text style={styles.welcome}>You're done!</Text>
                <Text style={styles.instructions}>You can now use this app with your {title} account to verify your identity.</Text>
            </View>
            <Button
                title="Done"
                onPress={onPressBackToAccounts}
                style={styles.btn}
            />
            <View style={{marginBottom:20}}></View>
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
        height:300,

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