import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';
import { uRIParser } from '../../util';

const QRScan = (props) => {
    const [barcode, setBarcode] = useState({});
    const barcodeRecognized = (_barcode) => {
        setBarcode(uRIParser(_barcode.data));
        //Navigation.pop(props.componentId);
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccessCodeScreen',
                passProps: {
                    secret: barcode.query.secret,
                    issuer: barcode.label.issuer,
                    accName: barcode.label.account
                }
            }
        });
    };
    // useEffect(() => {

    // }, [barcode.secret]);

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
