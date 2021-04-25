import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Topbar = (props) => {
    const { title, bottomBorder } = props;
    const finalStyles = []
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

Topbar.propTypes = {
    title: PropTypes.string
};

Topbar.defaultProps = {};

export default Topbar;
