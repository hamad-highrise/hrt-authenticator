import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center',
        marginLeft: 20
    },
    titleText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    }
});
