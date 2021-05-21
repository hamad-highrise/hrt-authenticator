import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './iconContainer.styles';

const IconContainer = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            {props.children}
        </TouchableOpacity>
    );
};

IconContainer.propTypes = {
    onPress: PropTypes.func
};

export default IconContainer;
