import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Item = ({ account }) => (
    <TouchableOpacity
        style={styles.item}
        onPress={() => alert(account['account_id'])}>
        <Text style={styles.title}>{account['account_name']}</Text>
        <Text style={styles.subtitle}>{account['issuer']}</Text>
    </TouchableOpacity>
);

export default Item;
