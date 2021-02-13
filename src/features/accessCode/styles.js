import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'lightgrey',
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
        // borderBottomColor: 'grey',
        // borderBottomWidth: 1
    },
    titleIDText: {
        fontSize: 24
    },
    middle: {
        flex: 0.1
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 48,
        fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        marginLeft: Dimensions.get('window').width * 0.11,
        marginRight: Dimensions.get('window').width * 0.18
    },
    bottom: {
        flex: 0.3
    },
    titleTimerText: {
        color: 'lightgrey',
        fontSize: 36,
        borderColor: 'darkgrey',
        borderBottomWidth: 5,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: '#424c58',
        width: 150,
        height: 140,
        borderRadius: 100 / 2,
        textAlign: 'center'
    },
    titleTimerNameText: {
        fontSize: 12,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2
    },
    selectorStyleInvert:{
        backgroundColor:'lightgrey',
        paddingLeft:20, paddingTop:13,paddingBottom:13,paddingRight:20,
        borderTopRightRadius:10,borderBottomRightRadius:10,
        width:Dimensions.get('window').width * 0.4,
    },
    selectorStyle:{
        backgroundColor:'#1c9db2',
        paddingLeft:20, paddingTop:13,paddingBottom:13,paddingRight:20,
        borderTopLeftRadius:10,borderBottomLeftRadius:10,
        width:Dimensions.get('window').width * 0.4,   
    },
    textStyle:{
        color:'lightgrey',
        fontSize:16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyleInvert:{
        color:'#1c9db2',
        fontSize:16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
