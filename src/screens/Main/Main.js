import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, IconButton } from '../../components';
import { SearchBar } from './components';
import { Navigation } from 'react-native-navigation';
import { Biometrics } from '../../util';
// import PropTypes from 'prop-types';

const Main = (props) => {
    const onPressHandler = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AddAccountScreen',
                options: {
                    topBar: {
                        title: {
                            text: 'Add Account'
                        }
                    }
                }
            }
        });
    };

    const biometricPrompt = async () => {
        try {
            const matched = await Biometrics.displaySimplePrompt(
                'Check Fingerprint'
            );
            if (matched) alert('Fingerprint matched!');
            else alert('Fingerprint not matched!');
        } catch (error) {
            console.warn(error);
            alert('Error!');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Accounts</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image source={require('../../assets/icons/add.png')} />
                    </IconButton>
                </View>
            </View>
            <View>
                <SearchBar />
                <Button
                    title="Open Biometric Prompt"
                    onPress={biometricPrompt}
                />
            </View>
        </View>
    );
};

Main.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    title: {
        marginLeft: 20
    },
    titleText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Main;
