import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: 'black',
        fontSize: 26,
        padding: 10,
        margin: 5,
        borderTopWidth:1,
        borderTopColor:'#adb6c6',
    },
    titleText: {
        color: 'white',
        fontSize: 15,
        lineHeight:15,
        marginTop:10,
        marginBottom:-8,
        borderBottomWidth:0.5,
        borderBottomColor:'#adb6c6',
    },
    title: {
        fontSize: 25,
        color: 'black'
    },
    subtitle: {
        fontSize: 16,
        color: 'grey'
    },
    item: {
        backgroundColor: 'black',
        padding: 10,
        marginVertical: 0.5,
        flexDirection: 'column',
        borderRadius: 10
    },
    SListitem: {
        backgroundColor: "black",
        padding: 15,
        marginVertical: 0,
        margin:5,
    },
    SListheader: {
        fontSize: 20,
        padding: 2,
        backgroundColor: "black",
        color:'white',
        lineHeight:25,
    },
    SListtitle: {
        fontSize: 20,
        color: 'grey',
       paddingRight: 9,
    }
});
