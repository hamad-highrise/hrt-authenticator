import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

export default Header;
