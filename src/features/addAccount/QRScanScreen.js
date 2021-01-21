import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import { tryJSONParser, uRIParser } from '../../util';
import navigator from '../../navigation';
import account from '../../util/sqlite/account';

const QRScan = (props) => {
    const [isRead, setIsRead] = useState(false);
    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            if (tryJSONParser(_barcode.data).valid) {
                //Start SAM Account flow here
                alert('SAM Account is not supported yet!!');
            } else {
                const parsedData = uRIParser(_barcode.data);
                try {
                    account.create({
                        name: parsedData.label.account,
                        issuer: parsedData.label.issuer,
                        secret: parsedData.query.secret
                    });

                    navigator.goToRoot(props.componentId);
                } catch (error) {
                    alert(JSON.stringify(error));
                }
            }
        }
    };

    return (
        <>
            <QRCodeReader
                captureAudio={false}
                style={styles.container}
                onBarCodeRead={barcodeRecognized}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
});

export default QRScan;
