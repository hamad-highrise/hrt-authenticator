import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listContainer: {
        flex: 1
    },
    header: {
        backgroundColor: 'white',
        fontSize: 26,
        padding: 10,
        margin: 5,
        borderTopWidth: 1,
        borderTopColor: 'black'
    },
    titleText: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 15,
        marginTop: 10,
        marginBottom: -8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#adb6c6'
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
        padding: 10,
        marginVertical: 0.5,
        flexDirection: 'column',
        borderRadius: 10
    },
    SListitem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 0,
        margin: 5
    },
    SListheader: {
        fontSize: 20,
        padding: 2,
        color: '#424c58',
        lineHeight: 25,
        fontWeight:'bold'
    },
    SListtitle: {
        fontSize: 16,
        color: 'grey',
    },
    notificationText: {
        fontSize: 16,
        color: '#1c6db2',
    },
    error: {},
    errorText: {
        fontSize: 16,
        color: '#96281b',
    }
});
