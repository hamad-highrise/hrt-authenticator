import * as React from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Dimensions } from 'react-native';

import { CameraAuthorization } from './components';
import styles from './scanner.styles';
import { useRef } from 'react';

const { width } = Dimensions.get('window');
const maskRowHeight = 16;
const maskColWidth = (width - 300) / 2;

const QRScanner = ({ onBarCodeRead }) => {
    const camRef = useRef();

    const refresh = async () => {
        camRef.current.refreshAuthorizationStatus();
    };
    return (
        <RNCamera
            captureAudio={false}
            ref={(ref) => (camRef.current = ref)}
            style={{
                flex: 1,
                width: '100%'
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
                title: 'Camera Access Permission',
                message: 'We neeed to access you rcamera for scanning QRs.',
                buttonPositive: 'OK'
            }}
            onBarCodeRead={onBarCodeRead}>
            {({ status, camera }) => {
                return status === 'READY' ? (
                    <>
                        <View style={styles.maskOutter}>
                            <View
                                style={[
                                    { flex: maskRowHeight },
                                    styles.maskRow,
                                    styles.maskFrame
                                ]}
                            />
                            <View style={[{ flex: 35 }, styles.maskCenter]}>
                                <View
                                    style={[
                                        { width: maskColWidth },
                                        styles.maskFrame
                                    ]}
                                />
                                <View style={styles.maskInner} />
                                <View
                                    style={[
                                        { width: maskColWidth },
                                        styles.maskFrame
                                    ]}
                                />
                            </View>
                            <View
                                style={[
                                    { flex: maskRowHeight },
                                    styles.maskRow,
                                    styles.maskFrame
                                ]}
                            />
                        </View>
                    </>
                ) : (
                    status === 'PENDING_AUTHORIZATION' ||
                        (status === 'NOT_AUTHORIZED' && (
                            <CameraAuthorization
                                refresh={refresh}
                                rejected={status === 'NOT_AUTHORIZED'}
                            />
                        ))
                );
            }}
        </RNCamera>
    );
};

export default QRScanner;
