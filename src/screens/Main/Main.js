
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Button, IconButton } from '../../components';
import { SearchBar } from './components';
import { Navigation } from 'react-native-navigation';
import { Biometrics } from '../../util';
import Database from '../../util/sqlite';
// import PropTypes from 'prop-types';
import ListItem from './components/ListItem/ListItem';

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


    const [items, setItems] = useState([
        {id: '786', text: 'HBL pim'},
        {id: '591', text: 'HBL sam'},
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <IconButton onPress={() => alert('Device Info Section')}>
                        <Image source={require('../../assets/icons/settings2.png')} style={{width:37,height:37,marginLeft:5, marginTop:2}} />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Accounts</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image source={require('../../assets/icons/add.png')} style={{marginLeft:-10,marginTop:-3}} />
                    </IconButton>
                </View>
            </View>


            <View style={{ margin: 5 }} />
            <FlatList
                data={items}
                renderItem={({item})=> <ListItem item={item} />}
            />

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
