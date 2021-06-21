import * as React from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Button } from '../../../components';

const QRScanner = ({ onBarCodeRead, onPress }) => {
    const { width } = Dimensions.get('window');
    const maskRowHeight = 16;
    const maskColWidth = (width - 300) / 2;
    return (
        <RNCamera
            captureAudio={false}
            style={{
                flex: 1,
                width: '100%'
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            onBarCodeRead={onBarCodeRead}>
            {({ status }) => {
                return (
                    status === 'READY' && (
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
                                    onPress={onPress}
                                    label={'Enter Code Manually'}
                                    rippleColor="#ACA8A8"
                                    style={{
                                        width: '90%',
                                        backgroundColor: 'grey'
                                    }}
                                />
                            </View>
                        </>
                    )
                );
            }}
        </RNCamera>
    );
};

export default QRScanner;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    maskRow: {
        width: '100%'
    },
    maskCenter: { flexDirection: 'row' }
});
