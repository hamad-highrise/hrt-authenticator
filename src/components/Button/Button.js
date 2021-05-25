import React from 'react';
import { Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../theme';

const Button = ({ label, onPress, style, params, rippleColor }) => {
    const onButtonPress = () => {
        onPress && onPress(params);
    };
    return (
        <Pressable
            android_ripple={{ color: rippleColor }}
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
    style: PropTypes.any,
    rippleColor: PropTypes.any
};

Button.defaultProps = {
    rippleColor: colors.SECONDARY
};

export default Button;
