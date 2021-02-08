import React, { useCallback } from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, TopNavbar } from '../../components';
import navigation from '../../navigation';
const AddScreen = (props) => {
    const onQrScanClick = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.qrScan);
    }, [props.componentId]);

    const onManualCodeClick = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.accountForm);
    }, [props.componentId]);

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
            <TopNavbar title="Add Account"></TopNavbar>

            <View style={styles.container}>
                <View style={{ margin: 25 }} />
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
                    <View style={{ margin: 12 }} />
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

AddScreen.options = {
    topBar: {
        visible: false
    }
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.4,
        alignItems: 'center'
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
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    title: {
        marginLeft: 20
    }
});
