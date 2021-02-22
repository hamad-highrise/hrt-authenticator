import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    Platform
} from 'react-native';

const Loader = ({ show, color, backgroundColor }) => (
    <View style={{ ...styles.container, backgroundColor }}>
        <ActivityIndicator
            animating={show}
            color="#0000ff"
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
    backgroundColor: '#010101',
    color: 'blue'
};

export default Loader;
