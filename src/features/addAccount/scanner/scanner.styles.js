import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    maskRow: {
        width: '100%'
    },
    maskCenter: { flexDirection: 'row' }
});
