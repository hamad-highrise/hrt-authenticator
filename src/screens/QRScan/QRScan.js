import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';
import { tryJSONParser, uRIParser } from '../../util';
import account from '../../util/sqlite/account';

const QRScan = (props) => {
    const [isRead, setIsRead] = useState(false);
    const barcodeRecognized = async (_barcode) => {
        if (!isRead) {
            if (tryJSONParser(_barcode.data).valid) {
                alert('SAM Account is not supported yet!!');
            } else {
                const parsedData = uRIParser(_barcode.data);
                try {
                    await account.create({
                        name: parsedData.label.account,
                        issuer: parsedData.label.issuer,
                        type: parsedData.type,
                        secret: parsedData.query.secret
                    });
                    setIsRead(true);
                    props.referesh();
                    Navigation.pop(props.componentId);
                } catch (error) {
                    alert(JSON.stringify(error));
                }
            }
        }

        // Navigation.push(props.componentId, {
        //     component: {
        //         name: 'authenticator.AccessCodeScreen',
        //         passProps: {
        //             secret: barcode.query.secret,
        //             issuer: barcode.label.issuer,
        //             accName: barcode.label.account
        //         }
        //     }
        // });
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

// const renderBarcode = ({ bounds, data }) => (
//   <React.Fragment key={data + bounds.origin.x}>
//     <View
//       style={{
//         borderWidth: 2,
//         borderRadius: 10,
//         position: 'absolute',
//         borderColor: '#F00',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         padding: 10,
//         ...bounds.size,
//         left: bounds.origin.x,
//         top: bounds.origin.y
//       }}>
//       <Text
//         style={{
//           color: '#F00',
//           flex: 1,
//           position: 'absolute',
//           textAlign: 'center',
//           backgroundColor: 'transparent'
//         }}>
//         {data}
//       </Text>
//     </View>
//   </React.Fragment>
// );
