import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { IconButton } from '../../components';
import  {Navigation} from 'react-native-navigation';
import ListItem from '../Main/components/ListItem/ListItem';

const Main = (props) => {
    const onPressHandler = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.MainScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };

    const [items, setItems] = useState([
        { id: '2.4.4', text: 'Version', },
        { id: '2.1.2', text: 'IBM Security Verify SDK version' },
        { id: '03', text: 'IBM Security Verify User Guide' },
        { id: '04', text: 'Terms and Conditions' },
        { id: '05', text: 'Privacy Policy' },
        { id: '06', text: 'Third Party Notices' },
        { id: '07', text: 'Security Assessment' }
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandler} >
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 5,
                                    marginTop: 2
                                }
                            ]}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Device Info</Text>
                </View>
                {/* <View>
                    <IconButton onPress={()=> alert("device info")}>
                        <Image
                            source={require('../../assets/icons/add.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View> */}
            </View>

            <View style={{ marginLeft: 5, marginRight: 5 }} />
            <FlatList
                style={{ margin: 5 }}
                data={items}
                renderItem={({ item }) => <ListItem item={item} onPress={() => alert("more info at browser")} />}
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
    iconBtn: {
        width: 37,
        height: 37
    },
});

export default Main;
