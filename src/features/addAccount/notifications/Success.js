import React from 'react';
// import { Navigation } from 'react-native-navigation';
import { Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
const NotifyProcessComplete = ({ props, title }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/icons/tick.png')}></Image>
            <Text style={styles.welcome}>You're done!</Text>
            <Text style={styles.instructions}>
                You can now use this app with your {title} account to verify
                your identity
            </Text>
        </View>
    );
};

NotifyProcessComplete.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyProcessComplete.defaultProps = {
    title: 'HBL SAM'
};

export default NotifyProcessComplete;
