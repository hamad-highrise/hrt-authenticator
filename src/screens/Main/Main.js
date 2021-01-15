import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, NativeModules } from 'react-native';
const { Utilities } = NativeModules;
import { Button, IconButton } from '../../components';
import { SearchBar } from './components';
import { Navigation } from 'react-native-navigation';
import { Biometrics } from '../../util';
import Database from '../../util/sqlite';
// import PropTypes from 'prop-types';

const Main = (props) => {
    const [deviceInfo, setDeviceInfo] = useState({ name: 'Iphone' });

    // setDeviceInfo((prevState)=>{
    //     return {
    //         ...prevState,
    //         brand: 'android'
    //     }
    // });

    const init = async () => {
        try {
            const aDeviceInfo = await Utilities.getDeviceInfo();
            // console.warn(aDeviceInfo);
        } catch (error) {
            console.warn(error);
        }
    };
    useEffect(() => {
        init();
        initDb();
    }, []);

    const initDb = async () => {
        const db = new Database();
        try {
            await db.getInstance();
            // await db.setUpDatabase();
            const result = await db.exequteQuery('SELECT * FROM methods');
            console.warn(result[0].rows.raw());
            // var len = result.rows.length;
            // for (let i = 0; i < len; i++) {
            //     let row = result.rows.item(i);
            //     console.warn(
            //         `Employee name: ${row['method_id']}, Dept Name: ${row['method_name']}`
            //     );
            // }
        } catch (error) {
            console.warn(error);
        }
    };
    const testDb = async () => {};
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
    const toggleFlagsPress = () => {
        Utilities.toggleSecureFlag();
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
                {/* <View>
                    <Text>Model: {model}</Text>
                    <Text>Manufacturer: {manufacturer}</Text>
                </View> */}
                <Button
                    title="Open Biometric Prompt"
                    onPress={biometricPrompt}
                    size={'small'}
                    style={styles.btn}
                />
                <Button title="Toggle Flags" onPress={toggleFlagsPress} />
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
    },
    btn: {
        backgroundColor: 'black'
    }
});

export default Main;
