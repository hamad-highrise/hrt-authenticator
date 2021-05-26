import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginLeft: 20
    },
    listitem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'space-between',
        backgroundColor: '#d3d3d380'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8
    },
    listitemText: {
        fontSize: 17,
        color: '#424c58'
    },
    img: {
        width: 20,
        height: 20
    },
    listitemBottom: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    listitemTextBottom: {
        fontSize: 16,
        color: '#424c58'
    },
    listitemSubTextBottom: {
        fontSize: 14,
        color: '#424c5899'
    },
    spacer: {
        backgroundColor: '#d3d3d380',
        borderColor: 'grey',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginTop: 110
    }
});
