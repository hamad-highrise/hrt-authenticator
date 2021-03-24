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
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        padding: -50,
        margin: -30
    },
    titleMainText: {
        color: 'black',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 32,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 25,
        height: 30
    },
    top: {
        flex: 0.1,
    },
    titleIDText: {
        fontSize: 22
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
        width: '100%',
        justifyContent: 'center',
    },
    selectorSeparator: {
        width: 0,
        backgroundColor: 'black'
    },
    selected: {
        backgroundColor: '#0f62fe',
    },
    selectedLeft: {
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    selectedRight: {
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
    selectedInvert: {
        backgroundColor: 'lightgrey'
    },
    selectedInvertLeft: {
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7
    },
    selectedInvertRight: {
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7
    },

    selectorText: {
        fontSize: 15,
        color: '#0f62fe',
    },
    selectedText: {
        color: 'white'
    },
    btn: {
        backgroundColor: 'red',
        paddingVertical: 13,
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
        borderColor: '#0f62fe99',
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
    },
    imgg: {
        width: 25,
        height: 25
    }
});
