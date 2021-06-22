import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    Platform
} from 'react-native';

import { colors } from '../../theme';

const Loader = ({ show, backgroundColor }) => (
    <View style={{ ...styles.container, backgroundColor }}>
        <ActivityIndicator
            animating={show}
            color={colors.PRIMARY}
            size={Platform.OS === 'android' ? 70 : 'large'}
        />
        <Text style={{ color: 'white' }}>Requesting Server...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Loader.defaultProps = {
    backgroundColor: '#010101'
};

export default Loader;
