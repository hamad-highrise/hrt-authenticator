import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import parser from './parser';
import { TopNavbar, LoadingIndicator, Button } from '../../../components';
import initiateSamAccount from '../mmfa';
import { createAccount, isUnique } from '../services';
import { vibrate } from '../../../native-services/utilities';
import { constants } from '../../../global';
import screensIdentifiers from '../../../navigation/screensId';
import { mainActions } from '../../main/services';

const QRScan = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { isConnected } = useSelector(({ alert }) => alert);
    const dispatch = useDispatch();
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    const onManualCodeClick = useCallback(() => {
        navigation.navigate(screensIdentifiers.accountForm);
    }, [props.componentId]);

    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            vibrate();
            const { value, valid } = tryJSONParser(_barcode.data);
            if (valid) {
                //MMFA Account is being Started
                if (isConnected) {
                    setLoading(true);
                    try {
                        const result = await initiateSamAccount(value);

                        navigation.navigate(screensIdentifiers.success, {
                            serviceName: result.issuer,
                            accId: result.insertId,
                            methods: result.methods,
                            type: constants.ACCOUNT_TYPES.SAM
                        });
                    } catch (error) {
                        setLoading(false);
                        navigation.navigate(screensIdentifiers.main);
                    }
                }
            } else {
                setLoading(true);
                //TOTP Account Flow
                const parsedData = uriParser(_barcode.data);
                if (!parsedData) {
                    alert('Invalid QR Code');
                    navigation.goBack();
                } else {
                    const account = {
                        name: parsedData.label.account,
                        issuer: parsedData.label.issuer,
                        secret: parsedData.query.secret,
                        type: constants.ACCOUNT_TYPES.TOTP
                    };
                    try {
                        if (await isUnique(account)) {
                            await createAccount({ account });
                            setLoading(false);
                            navigation.navigate(screensIdentifiers.main);
                        } else {
                            setLoading(false);
                            alert(
                                'Error: An account can not be registered multiple times.'
                            );
                            navigation.goBack();
                        }
                    } catch (error) {
                        alert('Unable to register an account.');
                        setLoading(false);
                    }
                }
            }
            dispatch(mainActions.getAllAccounts());
        }
    };
    const { width } = Dimensions.get('window');
    const maskRowHeight = 16;
    const maskColWidth = (width - 300) / 2;

    return (
        <>
            {loading ? (
                <LoadingIndicator show={loading} />
            ) : (
                <>
                    <TopNavbar
                        title="Scan QR code"
                        imageBackOnPress={() =>
                            navigation.navigate(screensIdentifiers.main)
                        }
                    />
                    {!isConnected && (
                        <View
                            style={{
                                backgroundColor: 'black',
                                width: '100%',
                                height: 35,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'monospace',
                                    color: 'white'
                                }}>
                                No Internet
                            </Text>
                        </View>
                    )}
                    <QRCodeReader
                        captureAudio={false}
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                        onBarCodeRead={barcodeRecognized}>
                        <View style={styles.maskOutter}>
                            <View
                                style={[
                                    { flex: maskRowHeight },
                                    styles.maskRow,
                                    styles.maskFrame
                                ]}
                            />
                            <View style={[{ flex: 35 }, styles.maskCenter]}>
                                <View
                                    style={[
                                        { width: maskColWidth },
                                        styles.maskFrame
                                    ]}
                                />
                                <View style={styles.maskInner} />
                                <View
                                    style={[
                                        { width: maskColWidth },
                                        styles.maskFrame
                                    ]}
                                />
                            </View>
                            <View
                                style={[
                                    { flex: maskRowHeight },
                                    styles.maskRow,
                                    styles.maskFrame
                                ]}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '15%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Button
                                onPress={onManualCodeClick}
                                label={'Enter Code Manually'}
                                rippleColor="#ACA8A8"
                                style={{
                                    width: '90%',
                                    backgroundColor: 'grey'
                                }}
                            />
                        </View>
                    </QRCodeReader>
                </>
            )}
        </>
    );
};

export default React.memo(QRScan);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    maskRow: {
        width: '100%'
    },
    maskCenter: { flexDirection: 'row' }
});
