import React from 'react';
import { View } from 'react-native';

import {
    LoadingIndicator,
    NetworkIndicator,
    Topbar,
    Button
} from '../../components';
import { QrScanner } from './scanner';
import assets from '../../assets';
import { useQR } from './hooks';

const QRScan = () => {
    const {
        isFocused,
        barcodeRecognized,
        onManualCode,
        loading,
        isConnected,
        navigation
    } = useQR();

    return (
        <>
            {loading ? (
                <LoadingIndicator show={loading} />
            ) : (
                <>
                    <Topbar
                        title="Scan QR Code"
                        topbarRight={{
                            visible: true,
                            onPress: navigation.goBack,
                            image: {
                                source: assets.icons.cross,
                                width: '50%',
                                height: '50%'
                            }
                        }}
                    />
                    {!isConnected && <NetworkIndicator />}
                    {isFocused && (
                        <QrScanner onBarCodeRead={barcodeRecognized} />
                    )}
                </>
            )}
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
                <Button
                    onPress={onManualCode}
                    label={'Enter Code Manually'}
                    rippleColor="#ACA8A8"
                    style={{
                        width: '90%',
                        backgroundColor: 'grey'
                    }}
                />
            </View>
        </>
    );
};

export default QRScan;
