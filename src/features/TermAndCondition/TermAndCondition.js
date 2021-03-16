import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Button } from '../../components';
import PropTypes from 'prop-types';

const TermAndCondition = () => {
    return (
        <View>
            <View>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        marginTop: 15,
                        marginVertical:10,
                        fontWeight: 'bold',
                        color: '#424c58'
                    }}>
                    Term And Condition
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.content}>
                    This IBM Mobile Application Privacy Statement ("Mobile
                    Privacy Statement") explains the data IBM may collect on
                    behalf of the entity that entitles you to use this IBM
                    product offering. This Mobile Privacy Statement only applies
                    to the information IBM may collect on behalf of that entity.
                    It does not apply to the information that entity may collect
                    for its own use.
                </Text>
                <View style={{ margin: 20 }} />
                <View>
                    <Button
                        title="Done"
                        style={styles.btnInvert}
                        onPress={() => alert('where to go ?')}
                    />
                </View>
            </View>
        </View>
    );
};

export default TermAndCondition;

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center'
        margin: 25,
        marginTop: 10
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
        backgroundColor: 'lightgrey',
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.25,
        alignSelf: 'flex-end'
    },
    title: {
        marginLeft: 20
    },
    content: {
        fontSize: 15,
        lineHeight: 23,
        color: '#424c58'
    }
});
