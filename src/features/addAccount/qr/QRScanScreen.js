import React, { useState } from 'react';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import parser from './parser';
import navigator from '../../../navigation';
import { TopNavbar } from '../../../components';
import { isUnique, addAccount } from '../offline/queries';
import initiateSamAccount from '../mmfa/initiate';

const QRScan = (props) => {
    const { tryJSONParser, uriParser } = parser;
    const [isRead, setIsRead] = useState(false);
    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            const { value, valid } = tryJSONParser(_barcode.data);
            if (valid) {
                try {
                    const result = await initiateSamAccount(value);
                    alert(JSON.stringify(result) + 'Okay');
                } catch (error) {
                    alert(JSON.stringify(error + 'Not Okay'));
                }
                navigator.goToRoot(props.componentId);
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
