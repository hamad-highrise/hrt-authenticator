import React from 'react';
import { View, Text } from 'react-native';

import styles from './network.styles';

const NetworkIndicator = () => (
    <View style={styles.container}>
        <Text style={styles.text}>No Internet</Text>
    </View>
);

export default NetworkIndicator;
