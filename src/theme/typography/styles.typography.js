import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
    default: {
        textAlign: 'center'
    },
    appTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.text.TITLE,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : 'arial'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputLabel: {
        textAlign: 'left',
        marginLeft: 3
    }
});
