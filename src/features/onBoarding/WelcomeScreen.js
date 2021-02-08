//All first start logic will go here
// e.g. database setup and notification channel creation
import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import navigator from '../../navigation';
import { initiateDb } from './init-db';

const WelcomeScreen = (props) => {
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        try {
            await initiateDb();
        } catch (error) {
            console.warn(error);
            alert(error);
        }
    };
    return (
        <View>
            <Text>WELCOME!</Text>
            <Button
                title="Continue"
                onPress={() =>
                    navigator.goTo(props.componentId, navigator.screenIds.main)
                }
            />
        </View>
    );
};

WelcomeScreen.options = {
    topBar: {
        visible: false
    }
};

export default WelcomeScreen;
