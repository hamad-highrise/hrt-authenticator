import React, { useEffect } from 'react';
import { utilities } from '../../native-services';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { mainActions } from '../main/services';
import navigator from '../../navigation';

const Splash = (props) => {
    const dispatch = useDispatch();
    const { accounts } = useSelector(({ main }) => main);
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        if (await utilities.isInitiated()) {
            dispatch(mainActions.getAllAccounts());
        } else {
            navigator.setOnBoardingRoot();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (accounts !== null) {
                navigator.setMainRoot();
            }
        }, 2000);
    }, [JSON.stringify(accounts)]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4F6D7A" />
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: Dimensions.get('window').height * 0.2
                }}>
                <Image
                    source={require('../../assets/images/highrise-logo.png')}
                    style={styles.image}
                />
                {/* <Text style={{ ...styles.welcome, flex: 3}}>
                    AUTHENTICATOR
                </Text> */}
            </View>
            <View>
                <Text style={styles.instructions}>HIGHRISE</Text>
                <Text style={styles.Subinstructions}>TECHNOLOGIES</Text>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: '#424c58',
        fontFamily: 'sans-serif-condensed'
    },
    instructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: -2,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 6,
        fontFamily: 'sans-serif-condensed'
    },
    Subinstructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: 2,
        fontFamily: 'sans-serif-condensed'
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: 75
    }
});
