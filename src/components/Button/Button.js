import React from 'react';
import { Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Button = ({ label, onPress, style, params }) => {
    const onButtonPress = () => {
        onPress && onPress(params);
    };
    return (
        <Pressable
            android_ripple={{ color: '#6FA0FE' }}
            onPress={onButtonPress}
            style={[
                styles.conatiner,
                ...(Array.isArray(style) ? style : []),
                typeof style === 'object' ? style : {}
            ]}>
            <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
    );
};

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    params: PropTypes.any,
    style: PropTypes.any
};

export default Button;
