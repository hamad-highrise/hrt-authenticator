import React, { useState } from 'react';
import { Button, Modal } from '../../../components';
import styles from '../styles';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

const Settings = ({ onPress }) => {
    const [AccType, setFunc] = useState('Normal');

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
                                source={require('../../../assets/icons/backarrowinvert.png')}
                                style={styles.img}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
            <View style={{ margin: 5 }} />
            <View>
                <Button
                    title="Remove Account"
                    style={styles.btn}
                    onPress={() => alert('hatao is account ko pleez')}
                />
                <Text
                    style={{
                        marginTop: 30,
                        alignSelf: 'center',
                        fontSize: 14
                    }}>
                    Removing this account may prevent you from verifying in the
                    future.
                </Text>
            </View>
        </View>
    );
};
export default Settings;
