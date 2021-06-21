import React from 'react';

import {
    LoadingIndicator,
    NetworkIndicator,
    Topbar
} from '../../../components';
import QRScanner from './QRScanner';
import assets from '../../../assets';
import { useQR } from '../hooks';

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
                        <QRScanner
                            onBarCodeRead={barcodeRecognized}
                            onPress={onManualCode}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default QRScan;
