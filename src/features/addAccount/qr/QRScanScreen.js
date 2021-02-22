import React, { useEffect, useState } from 'react';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar, LoadingIndicator } from '../../../components';
import { isUnique, addAccount } from '../offline/queries';
import initiateSamAccount from '../mmfa/initiate';
import { registerBiometrics } from '../mmfa/registerMethods';
import { vibrate } from '../../../util/utilities';
import biometric from '../../../util/biometrics';

const QRScan = (props) => {
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPositive = async (endpoint, token) => {
        try {
            const { available, error } = await biometric.isSensorAvailable();
            if (available) {
                const result = await registerBiometrics(endpoint, token);
                console.warn(result.json());
                if (result && result.respInfo.status === 200) {
                    navigator.goToRoot(props.componentId);
                } else {
                    alert('Error registering biometrics');
                }
            } else {
                alert(JSON.stringify(error));
            }
        } catch (error) {
            alert(error);
        } finally {
            navigator.goToRoot(props.componentId);
        }
    };

    const onNegative = () => {
        navigator.goToRoot(props.componentId);
    };

    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time

        if (!isRead) {
            setIsRead(true);
            setLoading(true);
            vibrate();
            const { value, valid } = tryJSONParser(_barcode.data);
            if (valid) {
                try {
                    const result = await initiateSamAccount(value);
                    if (result.message === 'OKAY') {
                        navigator.goTo(
                            props.componentId,
                            navigator.screenIds.biometricOption,
                            {
                                title: result.accountName,
                                onPositive: onPositive,
                                onNegative: onNegative,
                                endpoint: result.enrollmentEndpoint,
                                token: result.token
                            }
                        );
                    } else alert(result.message);
                } catch (error) {
                    alert(JSON.stringify(error + 'Not Okay'));
                    navigator.goToRoot(props.componentId);
                }
            } else {
                const parsedData = uriParser(_barcode.data);
                const account = {
                    name: parsedData.label.account,
                    issuer: parsedData.label.issuer,
                    secret: parsedData.query.secret
                };
                if (await isUnique(account)) {
                    addAccount(account);
                } else {
                    alert('Duplicate Account');
                }
                navigator.goToRoot(props.componentId);
            }
        }
    };

    return (
        <>
            {loading ? (
                <LoadingIndicator show={loading} />
            ) : (
                <>
                    <TopNavbar title="Scan QR" />
                    <QRCodeReader
                        captureAudio={false}
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                        onBarCodeRead={barcodeRecognized}
                    />
                </>
            )}
        </>
    );
};

QRScan.options = {
    topBar: {
        visible: false
    }
};

export default QRScan;
