import React, { useEffect } from 'react';

import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { accountActions } from '../actions.public';
import { initiateDb } from './init-db';
import { utilities } from '../../native-services';
import screensIdentifiers from '../../navigation/screensId';
import { Typography } from '../../theme';
import { values } from '../../global';
import assets from '../../assets';
import styles from './styles';

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
                    await utilities.setInitiated();
                    
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
