import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 34,
        margin: 10,
        color: 'black',
        lineHeight: 50
    },
    listitem: {
        padding: 13,
        backgroundColor: '#0f62fe10',
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
    SListheader: {
        fontSize: 24,
        color: '#424c58',
        fontWeight: 'bold',
        lineHeight: 25,
        padding: 2,
        marginLeft: 10,
        marginRight: 10
    },
    SListtitle: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 10,
        marginRight: 10
    },
    header: {
        flexDirection: 'row',
        height: 49,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 0,
        paddingVertical: 27
    },
    titleMainText: {
        color: 'black',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    bar: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
    iconBtn: {
        width: 25,
        height: 25,
        marginTop: 10
    },
    decisionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        height: 60
    },
    fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: "powderblue"
      },
      fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10,

        marginTop: 50,
        paddingTop: 25,
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: 'pink'
      },
});
