import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { mainActions } from '../main/services';
import { initiateDb } from './init-db';
import { setInitiated } from '../../native-services/utilities';
import { utilities } from '../../native-services';
import screensIdentifiers from '../../navigation/screensId';

const SET_ROOT_DELAY = 2 * 1000;

const Splash = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { accounts } = useSelector(({ main }) => main);
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        if (await utilities.isInitiated()) {
            dispatch(mainActions.getAllAccounts());
        } else {
            try {
                await initiateDb();
                await setInitiated();
            } catch (error) {
                alert('Error while initiating application.');
            }
            setTimeout(() => {
                navigation.navigate(screensIdentifiers.main);
            }, SET_ROOT_DELAY);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (accounts !== null) {
                navigation.navigate(screensIdentifiers.main);
            }
        }, SET_ROOT_DELAY);
    }, [JSON.stringify(accounts)]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: Dimensions.get('window').height * 0.2
                }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.image}
                />
                <Text style={{ ...styles.welcome, fontSize: 30 }}>
                    Fidelity Verify
                </Text>
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
        width: 200,
        height: 200
    }
});
