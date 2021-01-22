import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button } from '../../components';
import { IconButton } from '../../components';
const AddScreen = (props) => {
    const onQrScanClick = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.QRScanScreen',
                options: {
                    topBar: {
                        title: {
                            text: 'Scan QR'
                        }
                    }
                }
            }
        });
    };

    const onManualCodeClick = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.CodeAccountScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerAccountSettings = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccountSettingsScreen',
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
            {/* TOPBAR */}
            <View style={styles.header}>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('Go to Main screen')}>
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={{
                                width: 25,
                                height: 35,
                                marginLeft: 6,
                                marginTop: 10
                            }}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleMainText}>Add Account</Text>
                </View>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={onPressHandlerAccountSettings}>
                        <Image
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 9,
                                    marginTop: 12,
                                    width: 25,
                                    height: 30
                                }
                            ]}
                        />
                    </IconButton>
                </View>
            </View>
            {/* end TOPBAR */}
            <View
                style={{
                    width: Dimensions.get('window').width * 0.4
                }}>
                <View title="select mode of connection"></View>
                <Image
                    source={require('../../assets/images/addacc1.png')}
                    style={styles.image}
                />
                <Button
                    title="Scan QR Code"
                    style={styles.btn}
                    onPress={onQrScanClick}
                />
                <View style={{ margin: 10 }} />
                <Button
                    title="Add Manually"

                    onPress={onManualCodeClick}

                    style={styles.btnInvert}
                />
                <View style={{ margin: 20 }} />
            </View>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.5
    },
    btn: {
        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
    btnInvert: {. 
        backgroundColor: 'white',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width:Dimensions.get('window').width * 0.7,
    },
    header: {
        flexDirection: 'row',
        height: 53,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    title: {
        marginLeft: 20
    },

   //     width: Dimensions.get('window').width * 0.7
    //}

});
