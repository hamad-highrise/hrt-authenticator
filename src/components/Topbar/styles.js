import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 55,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
