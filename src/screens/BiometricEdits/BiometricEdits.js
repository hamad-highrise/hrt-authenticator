import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {TopNavbar} from '../../components';
const BiometricEdits = (props)=> {
    return (
        <View style={{flex:1,justifyContent:'space-between'}}>
            <TopNavbar title=""></TopNavbar>
            <View style={styles.container}>
            <View style={{ marginTop: 0 }}></View>
            <Image
                style={styles.image}
                source={require('../../assets/images/bio2.png')}></Image>
            <View>
                <Text style={styles.welcome}>Biometric</Text>
                <Text style={styles.instructions}>
                    Use biometric as a verification method to keep your accout
                    safe.
                </Text>
            </View>
            <View style={{ borderColor: 'black',borderWidth:0.25, width: Dimensions.get('window').width,marginBottom:30}} />
            <View style={{marginBottom:10}}>
                <Text style={styles.footerinstructions}>To remove Biometric</Text>
                <Text style={styles.Subinstructions}>
                    1. Remove the device from your account provider
                </Text>
                <Text style={styles.Subinstructions}>
                    2. Remove the account from HRT Security Verify
                </Text>
            </View>
        </View>
        </View>
    );
};

BiometricEdits.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

BiometricEdits.defaultProps = {
    title: 'Biometric Edits'
};

export default BiometricEdits;

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
        fontSize: 38,
        marginLeft: 20,
        margin: 10,
        color: 'black',
    },
    instructions: {
        marginLeft: 20,
        color: 'black',
        marginBottom: 50,
        fontSize: 16,
        // fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 120
    },
    footerinstructions: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    Subinstructions: {
        textAlign: 'center',
        color:'black',
        fontSize:12,
    },
});