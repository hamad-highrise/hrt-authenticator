import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image, FlatList } from 'react-native';
import { TopNavbar } from '../../components';
import  {Navigation} from 'react-native-navigation';
import ListItem from '../Main/components/ListItem/ListItem';

const DeviceInfo = (props) => {
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
    // NOIFICATION SCREEEN WORK
    const AccountAddedSuccess = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.NotifyAccountConnection',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const ProcessComplete = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.NotifyProcessComplete',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    return (
        
        <View style={styles.container}>
            <TopNavbar title="Device Info" onPress={()=>alert("zxcvb")}></TopNavbar>

            <View style={{ margin: 30}} />
            
            {/* li */}
            <TouchableOpacity style={styles.listitem} onPress={AccountAddedSuccess}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>Version</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={ProcessComplete}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>IBM Security Verify SDK version</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={() => alert("more info at browser")}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>IBM Security Verify User Guide</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={() => alert("more info at browser")}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>Terms and Conditions</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={() => alert("more info at browser")}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>Privacy Policy</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={() => alert("more info at browser")}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>Third Party Notices</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={() => alert("more info at browser")}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>Security Assessment</Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            {/* end li */}
        </View>
    );
};

DeviceInfo.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginLeft: 20
    },
    
    titleText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },

    listitem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 2,
        borderColor: '#eee',
        justifyContent:'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18,
        fontWeight:'bold',
        color:'#424c58',
    },
    listitemID: {
        fontSize: 12,
        flex: 1
    },
    img:{
        width: 32,
        height: 30,
        transform:[{rotate:'180deg'}],
        backgroundColor:'#e57f01',
        borderRadius:10,
    },
});

export default DeviceInfo;
