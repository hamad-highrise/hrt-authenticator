import React from 'react';
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

export default ({ onPress }) => (
    // <Button
    //     title="Remove Account"
    //     style={styles.btn}
    //     onPress={() => alert('Ye Account Hatao bhae')}
    // />

        <KeyboardAvoidingView
            style={styles.middles}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <View style={styles.bottoms}>
            <Button
                title="Remove Account"
                style={styles.btn}
                onPress={() => alert('hatao is account ko pleez')}
            />
            {/* <Modal style={styles.btnInvert} title="WARNING" subtitle="This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?"/> */}
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
        </KeyboardAvoidingView>

);
