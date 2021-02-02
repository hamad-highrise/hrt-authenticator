import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';
const BiometricOption = ({props,title}) => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/images/handqrcode.png')}></Image>
            <Text style={styles.welcome}>Biometric</Text>
            <Text style={styles.instructions}>Use biometric as a verification methid to keep your accout safe.</Text>
            <View>
                <Button
                    title="Use Biometric"
                    style={styles.btn}
                    onPress={()=>alert("Use biometric")}
                />
                <View style={{ margin: 12 }} />
                <Button
                    title="No, Thanks"
                    onPress={()=>alert("No, Thanks")}
                    style={styles.btnInvert}
                />
            </View>
        </View>
    );
};
BiometricOption.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

BiometricOption.defaultProps = {
    title: 'HBL PIM'
};

export default BiometricOption;

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