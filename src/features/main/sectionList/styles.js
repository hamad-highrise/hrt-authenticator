import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listContainer: {
        flex: 1
    },
    header: {
        backgroundColor: 'black',
        fontSize: 26,
        padding: 10,
        margin: 5
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
        color: 'gray'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 0.5,
        flexDirection: 'column',
        borderRadius: 10
    }
});
