import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default StyleSheet.create({
    conatiner: {
        width: Dimensions.get('window').width * 0.7,
        height: 60,
        backgroundColor: colors.PRIMARY,
        borderRadius: 2,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
});
