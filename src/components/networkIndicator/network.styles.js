import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: Platform.OS === 'android' ? 'monospace' : null,
        color: 'white'
    }
});
