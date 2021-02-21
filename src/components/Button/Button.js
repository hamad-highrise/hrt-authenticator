import React from 'react';
import { TouchableOpacity, StyleSheet, Text,Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const AndroidButton = ({ title, onPress, style, param }) => {
    const onButtonPress = () => {
        onPress(param);
    };

    return (
        <TouchableOpacity
            onPress={onButtonPress}
            style={{ ...styles.container, ...style }}>
            <Text style={styles.label}>{title}</Text>
        </TouchableOpacity>
    );
};

AndroidButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string,
    param: PropTypes.any,
    size: PropTypes.string,
    style: PropTypes.any
};

AndroidButton.defaultProps = {
    onPress: () => alert('BUTTON_PRESS_HANDLER_NOT_PROVIDED'),
    title: 'BUTTON',
    size: 'small'
};

export default AndroidButton;

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
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    large: {},
    small: {},
    btn: {
        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
    btnInvert: {
        backgroundColor: 'white',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    },
});
