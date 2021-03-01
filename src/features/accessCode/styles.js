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
        backgroundColor: 'black',
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
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectorSeparator: {
        width: 0,
        backgroundColor: 'black'
    },
    selected: {
        backgroundColor: '#0f62fe'
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
        color: '#0f62fe',
        fontWeight: 'bold'
    },
    selectedText: {
        color: 'white'
    },
    btn: {
        backgroundColor: 'red',
        paddingVertical: 13,
        // paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
    },
    middles: {
        flex: 0.12
    },
    bottoms: {
        flex: 0.3
    },
    listitem: {
        padding: 13,
        backgroundColor: '#0f62fe08',
        borderBottomWidth: 2,
        borderColor: '#0f62fe',
        justifyContent: 'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c58'
    },
    img: {
        width: 30,
        height: 28,
        // transform: [{ rotate: '180deg' }],
        // backgroundColor: '#e57f01',
        // borderRadius: 10
    },
    imgg: {
        width: 25,
        height: 25
    }
});
