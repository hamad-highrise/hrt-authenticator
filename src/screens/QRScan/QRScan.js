import React, { useState } from 'react';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { RNCamera as QRCodeReader } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';
import { tryJSONParser, uRIParser } from '../../util';
import { service } from './mmfaAccountFlow';
import account from '../../util/sqlite/account';

const QRScan = (props) => {
    const { Utilities, BiometricAndroid, CustomKeyGen } = NativeModules;
    const [isRead, setIsRead] = useState(false);
    const userPresenceKeyHandle = 'Account.' + Date.now() + '.UserPresence';
    const biometricKeyHandle = 'Account.' + Date.now() + '.FingerPrintMethod';
    const barcodeRecognized = async (_barcode) => {
        if (!isRead) {
            setIsRead(true);
            const deviceInfo = await Utilities.getDeviceInfo();
            const { valid, value } = tryJSONParser(_barcode.data);
            const validMMFAObject =
                value.code && value.options && value.details_url;
            if (valid) {
                if (validMMFAObject) {
                    try {
                        const details = await service.getDetails(
                            value.details_url
                        );
                        const tokenResult = await service.getToken(
                            details.token_endpoint,
                            {
                                code: value.code,
                                OSVersion: deviceInfo.osVersion,
                                frontCamera: deviceInfo.frontCamera,
                                fingerprintSupport: await BiometricAndroid.isSensorAvailable(),
                                deviceType:
                                    Platform.OS === 'android'
                                        ? 'Android'
                                        : 'iOS',
                                deviceName: deviceInfo.model
                            }
                        );
                        const {
                            publicKey: userPresenceKey
                        } = await CustomKeyGen.createKeys(
                            userPresenceKeyHandle
                        );
                        const {
                            publicKey: fingerprintKey
                        } = await CustomKeyGen.createKeys(biometricKeyHandle);
                        const biometriRegisterResult = await service.registerFingerPrintMethod(
                            details.enrollment_endpoint +
                                `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:fingerprintMethods`,
                            tokenResult['access_token'],
                            {
                                keyHandle: biometricKeyHandle,
                                publicKey: fingerprintKey
                            }
                        );
                        const userPresenceRegisterResult = await service.registerUserPresence(
                            details.enrollment_endpoint +
                                `?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Authenticator:userPresenceMethods`,
                            tokenResult['access_token'],
                            {
                                keyHandle: userPresenceKeyHandle,
                                publicKey: userPresenceKey
                            }
                        );
                        const totpRegisterResult = await service.registerTotp(
                            details['totp_shared_secret_endpoint'],
                            tokenResult['access_token']
                        );
                        const parsedData = uRIParser(
                            totpRegisterResult['secretKeyUrl']
                        );
                        account.create({
                            name: parsedData.label.account,
                            issuer: parsedData.label.issuer,
                            secret: parsedData.query.secret
                        });
                        Navigation.popToRoot(props.componentId);
                    } catch (error) {
                        alert('Error! Please try again later');
                        Navigation.popToRoot(props.componentId);
                    }
                } else {
                    alert('Invalid QR');
                    Navigation.popToRoot(props.componentId);
                }
            } else {
                const parsedData = uRIParser(_barcode.data);
                try {
                    account.create({
                        name: parsedData.label.account,
                        issuer: parsedData.label.issuer,
                        secret: parsedData.query.secret
                    });

                    Navigation.popToRoot(props.componentId);
                } catch (error) {
                    alert(JSON.stringify(error));
                }
            }
            // Navigation.popToRoot(props.componentId);
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
