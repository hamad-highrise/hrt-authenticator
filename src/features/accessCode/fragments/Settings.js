import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { constants } from '../../../global';
import { Button } from '../../../components';
import styles from '../code.styles';
import assets from '../../../assets';

const Settings = ({ removeAccount }) => {
    const selected = useSelector(({ selected }) => selected);
    const onRemovePress = () => {
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
                    text: 'Yes, Delete',
                    onPress: removeAccount,
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <View>
            {selected['type'] === constants.ACCOUNT_TYPES.SAM && (
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>Biometric</Text>
                        <Image
                            source={assets.icons.backArrow}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
            )}

            <View style={{ margin: 10 }} />
            <View>
                <Button
                    label="Remove Account"
                    style={styles.btn}
                    onPress={onRemovePress}
                    rippleColor="#FF7F7F "
                />
                <Text
                    style={{
                        marginTop: 12,
                        alignSelf: 'center',
                        fontSize: 16,
                        paddingHorizontal: 12
                    }}>
                    Removing this account may prevent you from verifying in the
                    future.
                </Text>
            </View>
        </View>
    );
};
export default Settings;
