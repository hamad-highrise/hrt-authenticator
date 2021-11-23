import React, { useEffect } from 'react';

import { StyleSheet, View, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { accountActions } from '../actions.public';
import { initiateDb } from './init-db';
import { setInitiated } from '../../native-services/utilities';
import { utilities } from '../../native-services';
import screensIdentifiers from '../../navigation/screensId';
import { Typography } from '../../theme';
import { values } from '../../global';
import assets from '../../assets';
import SplashScreen from 'react-native-splash-screen';

const SET_ROOT_DELAY = 2 * 1000;

const Splash = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const accounts = useSelector(({ accounts }) => accounts);
    useEffect(() => {
        SplashScreen.hide();
        init();
    }, []);

    const init = async () => {
        if (!(await (await utilities.getDeviceInfo()).rooted)) {
            if (await utilities.isInitiated()) {
                dispatch(accountActions.initiateAccounts());
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
        } else {
            setTimeout(() => {
                navigation.navigate(screensIdentifiers.rooted);
            }, SET_ROOT_DELAY);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (accounts !== null) {
                navigation.navigate(screensIdentifiers.main);
            }
        }, SET_ROOT_DELAY);
        return () => {
            clearTimeout(timer);
        };
    }, [JSON.stringify(accounts)]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image source={assets.images.logo} style={styles.image} />
                <Typography.AppTitle>{values.APP_NAME}</Typography.AppTitle>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: '#424c58',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    instructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: -2,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 6,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    Subinstructions: {
        textAlign: 'center',
        color: '#0f62fe',
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: 2,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-condensed' : null
    },
    image: {
        width: 250,
        height: 250
    },
    contentContainer: {
        alignItems: 'center',
        width: 250,
        height: 250,
        justifyContent: 'center'
    }
});
