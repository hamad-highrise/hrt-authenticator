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
        // color: '#0400ff'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 32,
        fontWeight: 'bold'
        // color: '#0400ff'
    },
    iconBtn: {
        width: 25,
        height: 30
    },
    top: {
        flex: 0.1
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

    btn: {
        backgroundColor: 'red',
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center'
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
        height: 28
    },
    imgg: {
        width: 25,
        height: 25
    },
    selectorContainer: {
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        height: 50
    },
    selector: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    right: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    labelText: {
        fontSize: 15,
        color: '#0f62fe',
        color: '#ff8100'
    },
    selected: {
        backgroundColor: '#0f62fe',
        backgroundColor: '#ff8100'
    },
    selectedText: {
        color: 'white'
    }
});
