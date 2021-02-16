import React from 'react';
import { Button } from '../../../components';
import styles from '../styles';

export default ({ onPress }) => (
    <Button
        title="Remove Account"
        style={styles.btn}
        onPress={() => alert('Ye Account Hatao bhae')}
    />
);
