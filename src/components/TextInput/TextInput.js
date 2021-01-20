import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView,TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';


const AndroidTextInput = ({placeholder,secureTextEntry, title, style, param }) => {

    return (

        <KeyboardAvoidingView style={styles.title}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={styles.titleCodeText}
            />
        </KeyboardAvoidingView>
    );
};

AndroidTextInput.propTypes = {
    // onPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    param: PropTypes.any,
    size: PropTypes.string,
    style: PropTypes.any
};

AndroidTextInput.defaultProps = {
    // onPress: () => alert('BUTTON_PRESS_HANDLER_NOT_PROVIDED'),
    placeholder: 'input some text',
    secureTextEntry: false,
    title: 'BUTTON',
    size: 'small'
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
        marginLeft: Dimensions.get('window').width * 0.03,
        marginRight: Dimensions.get('window').width * 0.07
    }
});
