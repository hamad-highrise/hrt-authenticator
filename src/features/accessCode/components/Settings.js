import React, { useState } from 'react';
import { Button } from '../../../components';
import styles from '../styles';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert
} from 'react-native';

const Settings = ({ removeAccount }) => {
    const [AccType, setFunc] = useState('Normal');

    const onRemovePress = async () => {
        Alert.alert(
            'Delete Account',
            `This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel'
                },
                {
                    text: 'Yes, delete',
                    onPress: removeAccount,
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {AccType == 'Normal' ? (
                    <TouchableOpacity
                        style={styles.listitem}
                        onPress={() => alert('zxcvbnm')}>
                        <View style={styles.listitemView}>
                            <TextInput
                                placeholder="Account Name"
                                style={{
                                    marginBottom: -20,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginLeft: -10
                                }}
                            />
                            <Image
                                source={require('../../../assets/icons/edit2.png')}
                                style={styles.imgg}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.listitem}
                        // onPress={onPressHandlerBiometricEdits}
                    >
                        <View style={styles.listitemView}>
                            <Text style={styles.listitemText}>Biometric</Text>
                            <Image
                                source={require('../../../assets/icons/backarrowblack.png')}
                                style={styles.img}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
            <View style={{ margin: 10 }} />
            <View>
                <Button
                    title="Remove Account"
                    style={styles.btn}
                    onPress={onRemovePress}
                />
                <Text
                    style={{
                        marginTop: 12,
                        alignSelf: 'center',
                        fontSize: 16,
                        paddingHorizontal: 12,
                    }}>
                    Removing this account may prevent you from verifying in the
                    future.
                </Text>
            </View>
        </View>
    );
};
export default Settings;
