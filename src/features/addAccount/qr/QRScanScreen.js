import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';

import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar, LoadingIndicator } from '../../../components';
import initiateSamAccount from '../mmfa';
import { createAccount, isUnique } from '../services';
import { vibrate } from '../../../native-services/utilities';
import { constants } from '../../../global';
import { useSelector } from 'react-redux';
import navigation from '../../../navigation';

const QRScan = (props) => {
    const { isConnected } = useSelector(({ alert }) => alert);
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    const onManualCodeClick = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.accountForm);
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
                        navigator.goTo(
                            props.componentId,
                            navigator.screenIds.success,
                            {
                                accountName: result.issuer,
                                accId: result.insertId,
                                methods: result.methods,
                                type: constants.ACCOUNT_TYPES.SAM
                            }
                        );
                    } catch (error) {
                        setLoading(false);
                        navigator.goToRoot(props.componentId);
                    }
                }
            } else {
                setLoading(true);
                //TOTP Account Flow
                const parsedData = uriParser(_barcode.data);
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
                        navigator.goTo(
                            props.componentId,
                            navigator.screenIds.success,
                            {
                                title: account.name,
                                type: constants.ACCOUNT_TYPES.TOTP
                            }
                        );
                    } else {
                        setLoading(false);
                        alert(
                            'Error: An account can not be registered multiple times.'
                        );
                        navigator.goToRoot(props.componentId);
                    }
                } catch (error) {
                    alert('Unable to register an account.');
                    setLoading(false);
                }
            }
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
                            navigator.goBack(props.componentId)
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
                            <TouchableOpacity
                                onPress={onManualCodeClick}
                                style={{
                                    width: '70%',
                                    backgroundColor: 'grey',
                                    height: 45,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    elevation: 15,
                                    shadowColor: 'grey',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: '100'
                                    }}>
                                    Enter Code Manually
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </QRCodeReader>
                </>
            )}
        </>
    );
};

export default QRScan;

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
