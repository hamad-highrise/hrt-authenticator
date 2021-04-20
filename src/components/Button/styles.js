import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    conatiner: {
        width: Dimensions.get('window').width * 0.7,
        height: 60,
        backgroundColor: '#0F62FE',
        borderRadius: 2,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
});
