import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {},
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '15%'
    },
    footerButton: {
        position: 'absolute',
        bottom: 0,
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    },
    footerBtnDeny: {
        left: 0,
        backgroundColor: 'red'
    },
    footerBtnApprove: {
        right: 0,
        backgroundColor: 'blue'
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 25,
        color: 'white'
    },
    btnText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
});
