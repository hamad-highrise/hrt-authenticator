import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 200,
        height: 200
    },
    responseView: {
        margin: 35
    },
    responseText: {
        color: 'grey',
        fontSize: 18
    },
    success: {
        color: colors.SUCCESS
    },
    fail: {
        color: colors.DANGER
    }
});
