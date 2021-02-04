import React from 'react';
import { StyleSheet, KeyboardAvoidingView,TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';


const AndroidTextInput = ({placeholder,secureTextEntry, value,onChangeText }) => {

    return (

        <KeyboardAvoidingView style={styles.title} keyboardVerticalOffset={40}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={styles.titleCodeText}
                onChangeText={onChangeText}
            />
        </KeyboardAvoidingView>
    );
};

AndroidTextInput.propTypes = {
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    param: PropTypes.any,
    style: PropTypes.any,
    value: PropTypes.string,
    onChangeText: PropTypes.any,
    keyboardVerticalOffset: PropTypes.number,
};

AndroidTextInput.defaultProps = {
    placeholder: 'input some text',
    secureTextEntry: false,
    keyboardVerticalOffset: 0,
};

export default AndroidTextInput;

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        backgroundColor: '#009688',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    label: {
        fontSize: 14,
        color: '#e57f01',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    large: {},
    small: {},
    title: {
        marginLeft: 20,
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        // marginLeft: Dimensions.get('window').width * 0.03,
        // marginRight: Dimensions.get('window').width * 0.07
        width:Dimensions.get('window').width * 0.67,
    }
});
