import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';

const QRScan = () => {
  const [barcode, setBarcode] = useState({});
  const barcodeRecognized = (barcode) => {
    setBarcode(barcode);
  };

  const renderBarcode = ({ bounds, data }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y
        }}>
        <Text
          style={{
            color: '#F00',
            flex: 1,
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'transparent'
          }}>
          {data}
        </Text>
      </View>
    </React.Fragment>
  );

  return (
    <>
      <QRCodeReader
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
