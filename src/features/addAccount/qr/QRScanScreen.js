import React, { useState } from 'react';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar, LoadingIndicator } from '../../../components';
import initiateSamAccount from '../mmfa/initiate';
import { createAccount } from '../services';
import { isUnique } from '../services/queries';
import { vibrate } from '../../../native-services/utilities';

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
                        onBarCodeRead={barcodeRecognized}></QRCodeReader>
                </>
            )}
        </>
    );
};

export default QRScan;
