import React, { useState } from 'react';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar } from '../../../components';
import addAccount from '../offline/queries';

const QRScan = (props) => {
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            if (tryJSONParser(_barcode.data).valid) {
                //Start SAM Account flow here
                alert('SAM Account is not supported yet!!');
            } else {
                const parsedData = uriParser(_barcode.data);

                addAccount({
                    name: parsedData.label.account,
                    issuer: parsedData.label.issuer,
                    secret: parsedData.query.secret
                })
                    .then((added) => {
                        if (!added) {
                            alert('Duplicate Account');
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    })
                    .finally(() => navigator.goToRoot(props.componentId));
            }
        }
    };

    return (
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
    );
};

QRScan.options = {
    topBar: {
        visible: false
    }
};

export default QRScan;
