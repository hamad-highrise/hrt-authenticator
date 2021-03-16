import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Button } from '../../components';
import PropTypes from 'prop-types';

const PrivacyPolicy = () => {
    return (
        <View>
            <View>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        // margin: 25,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: '#424c58'
                    }}>
                    Get Started
                </Text>
            </View>
            <View style={styles.container}>
            <Text
                    style={{
                        // alignSelf: 'center',
                        fontSize: 18,
                        margin: 25,
                        marginTop: 10,
                        // fontWeight: 'bold',
                        color: '#424c58'
                    }}>
                    This IBM Mobile Application Privacy Statement ("Mobile Privacy Statement") explains the data IBM may collect on behalf of the entity that entitles you to use this IBM product offering. This Mobile Privacy Statement only appliesl
                </Text>
                <View style={{ margin: 55 }} />
                <View>
                    <Button
                        title="Connect an account"
                        style={styles.btnInvert}
                        onPress={() => alert('where to go ?')}
                    />
                </View>
            </View>
        </View>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        marginLeft: 50,
        marginTop: 20,
        marginRight: 30,
        marginBottom: 30,
        lineHeight: 35
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.3,
        alignItems: 'center'
    },
    btnInvert: {
        backgroundColor: 'grey',
        paddingVertical: 23,
        paddingHorizontal: 5,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'flex-end'
    },
    title: {
        marginLeft: 20
    }
});
