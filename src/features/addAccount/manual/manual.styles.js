import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        margin: 10
    },
    title: {
        marginLeft: 5
    },
    titleText: {
        color: '#424c58',
        fontSize: 32,
        lineHeight: 45,
        marginTop: -10
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        marginBottom: 25
    },
    middle: {
        margin: 7,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center'
    },
    btn: {
        alignSelf: 'center'
    },
    SListtitle: {
        fontSize: 16,
        color: '#424c58',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -10
    },
    listitemInput: {
        marginBottom: -15,
        fontSize: 16,
        marginLeft: 20
    },
    bar: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        width: '95%',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    imgg: {
        width: 25,
        height: 25
    },
    bottom: {
        marginTop: '25%'
    },
    instruction: {
        fontSize: 15,
        color: 'grey',
        marginLeft: 10,
        marginRight: 10,
        marginTop: -20
    }
});
