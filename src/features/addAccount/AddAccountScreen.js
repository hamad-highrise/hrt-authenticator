import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';
import { Button, TopNavbar } from '../../components';
import navigation from '../../navigation';
const AddScreen = (props) => {
    const onQrScanClick = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.qrScan);
    }, [props.componentId]);

    const onManualCodeClick = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.accountForm);
    }, [props.componentId]);
    return (
        <View>
            <TopNavbar
                title="Connect an account"
                RightIcon="NO"
                imageBackOnPress={() =>
                    navigation.goBack(props.componentId)
                }></TopNavbar>

            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>
                        Scan the QR code on your computer
                    </Text>
                </View>
                <View>
                    <Image
                        source={require('../../assets/images/2typeAcc2.png')}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Button
                        title="Scan QR Code"
                        style={styles.btn}
                        onPress={onQrScanClick}
                    />
                    <View style={{ margin: 8 }} />
                    <Button
                        title="Enter code manually"
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
    heading: {
        fontSize: 32,
        margin: 30,
        lineHeight: 45
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.37,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    btnInvert: {
        backgroundColor: 'lightgrey',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    titleMainText: {
        color: 'grey',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    title: {
        marginLeft: 20
    }
});
