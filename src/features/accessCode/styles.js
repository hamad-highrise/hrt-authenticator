import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        margin: 10
    },
    header: {
        flexDirection: 'row',
        height: 53,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 36,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        flex: 0.2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    titleIDText: {
        fontSize: 24
    },
    middle: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 0.3
    },


    slectorContainer: {
        width: Dimensions.get('window').width * 0.4,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    selector: {
        paddingLeft: 20,
        paddingTop: 13,
        paddingBottom: 13,
        paddingRight: 20,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectorSeparator: {
        width: 2,
        backgroundColor: 'black'
    },
    selected: {
        backgroundColor: '#1c9db2'
    },
    selectedLeft: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    selectedRight: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    selectedInvert: {
        backgroundColor: 'lightgrey'
    },
    selectedInvertLeft: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    selectedInvertRight: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },

    selectorText: {
        fontSize: 15,
        color: '#1c9db2',
        fontWeight: 'bold'
    },
    selectedText: {
        color: 'white'
    },
    btn: {
        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    }
});
