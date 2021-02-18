import React from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../styles.screen';

const ScreenLayout = (props) => {
   
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.content}></View>

            <View style={styles.footer}></View>
        </View>
    );
};


const header = (props) => {
    const {} = props;
    return(
        <View>
            
        </View>
    );
};

export default ScreenLayout;
