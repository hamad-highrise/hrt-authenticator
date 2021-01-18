import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button } from '../../components';

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
    const onManualClick = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccountForm',
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
                    onPress={onManualClick}
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
    btnInvert: {
        backgroundColor: 'white',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,

        fontSize: 14,
        color: '#a24e12',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    }
});
