import React, { useState } from 'react';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar, LoadingIndicator } from '../../../components';
import initiateSamAccount from '../mmfa/initiate';
import { createAccount } from '../services';
import { isUnique } from '../services/queries';
import { vibrate } from '../../../native-services/utilities';
import { View, StyleSheet, Dimensions } from 'react-native';
import navigation from '../../../navigation';
const QRScan = (props) => {
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            setLoading(true);
            vibrate();
            const { value, valid } = tryJSONParser(_barcode.data);
            if (valid) {
                //MMFA Account is being Started
                try {
                    const result = await initiateSamAccount(value);
                    if (result.message === 'OKAY') {
                        navigator.goTo(
                            props.componentId,
                            navigator.screenIds.biometricOption,
                            {
                                title: result.accountName,
                                endpoint: result.enrollmentEndpoint,
                                token: result.token,
                                name: result.accountName,
                                issuer: result.issuer,
                                accId: result.insertId
                            }
                        );
                    } else alert(result.message);
                } catch (error) {
                    alert(JSON.stringify(error + 'Not Okay'));
                    navigator.goToRoot(props.componentId);
                }
            } else {
                //TOTP Account Flow
                const parsedData = uriParser(_barcode.data);
                const account = {
                    name: parsedData.label.account,
                    issuer: parsedData.label.issuer,
                    secret: parsedData.query.secret
                };
                if (await isUnique(account)) {
                    createAccount({ account });
                } else {
                    alert('Duplicate Account');
                }
                navigator.goToRoot(props.componentId);
            }
        }
    };
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = 16;
    const maskColWidth = (width - 300) / 2;

    return (
        <>
            {loading ? (
                <LoadingIndicator show={loading} />
            ) : (
                <>
                    <TopNavbar title="Scan QR code"  imageBackOnPress={() => navigation.goBack(props.componentId)}/>
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
