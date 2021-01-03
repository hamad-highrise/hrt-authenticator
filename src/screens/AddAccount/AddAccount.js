import React from 'react';
import { Navigation } from 'react-native-navigation';
import {
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

const AddScreen = (props) => {
    const onQrScanClick = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.QRScanScreen',
                options: {
                    topBar: {
                        title: {
                            text: 'Scan QR'
                        }
                    }
                }
            }
        });
    };
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.image}
                resizeMode="cover"
                source={require('../../assets/images/qr_photo.jpeg')}
            /> */}
            <View
                style={{
                    width: Dimensions.get('window').width * 0.4
                }}>
                <Button title="Scan QR Code" onPress={onQrScanClick} />
                <View style={{ margin: 5 }} />
                <Button
                    title="Add Manually"
                    onPress={() => alert('Add Account Manually')}
                />
            </View>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.5
    }
});
