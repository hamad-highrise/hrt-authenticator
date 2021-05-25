import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    section: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 0.5
    },
    middle: {
        flex: 3
    },
    right: {
        flex: 0.5
    }
});
