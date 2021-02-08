import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import navigation from '../../navigation';
import { TextInput, TopNavbar, Modal, Button } from '../../components';

const AccountSettings = (props) => {
    const { id, componentId } = props;

    const onRemovePress = async () => {
        try {
            navigation.goToRoot(componentId);
        } catch (error) {}
    };
    const createTwoButtonAlert = () =>
        Alert.alert(
            'Warning!',
            'This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: onRemovePress }
            ],
            { cancelable: false }
        );

    // contolled input
    const [firstName, setFirstName] = useState('');
    // end

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TopNavbar title="Account Settings"></TopNavbar>
            <View style={styles.container}>
                <View style={{ margin: 0 }}></View>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Server Name</Text>
                        <Text style={styles.titleIDText}>test.isd</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Account Name/Id"
                        style={styles.titleCodeText}
                    />
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Remove Account"
                        style={styles.btn}
                        onPress={createTwoButtonAlert}
                    />
                    <Modal style={styles.btn} />
                    <View style={{ margin: 10 }} />
                </View>
                <View style={{ margin: 5 }}></View>
            </View>
        </View>
    );
};

AccountSettings.options = {};

export default AccountSettings;
