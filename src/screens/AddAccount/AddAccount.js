import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import { Button } from '../../components';
import { IconButton } from '../../components';
import { TopNavbar } from '../../components';
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
        <View>
            <TopNavbar title="Connect an account"></TopNavbar>

            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Scan the QR code on your computer</Text>
                </View>
                <View>
                    <Image
                        source={require('../../assets/images/add3.png')}
                        style={styles.image}
                    />
                </View>
                    <View style={{ margin: 35 }} />
                <View>
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
                </View>
            </View>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    heading: {
        fontSize:32,margin:30,lineHeight:45,
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.3,
        alignItems:'center',
    },
    btn: {
        backgroundColor: '#ff8544',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'white',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
    btnInvert: {
        backgroundColor: '#1c9db2',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    },
    title: {
        marginLeft: 20
    }
});
