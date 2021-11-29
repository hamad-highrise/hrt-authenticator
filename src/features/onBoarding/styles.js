import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: '#424c58',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    instructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: -2,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 6,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    Subinstructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: 2,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    image: {
        width: 250,
        height: 250
    },
    contentContainer: {
        alignItems: 'center',
        width: 250,
        height: 250,
        justifyContent: 'center'
    }
});
