import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listContainer: {
        flex: 1
    },
    header: {
        backgroundColor: 'black',
        fontSize: 26,
        padding: 10,
        margin: 5,
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
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
        marginVertical: 0.12,
        color:'white',
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
