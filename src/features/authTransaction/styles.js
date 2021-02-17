import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1
    },
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
    btnText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
});