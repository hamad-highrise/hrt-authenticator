import React from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import navigation from '../../navigation';
import { TopNavbar, Button } from '../../components';
import { removeAccount } from './services';

const AccountSettings = (props) => {
    const { id, name, issuer, componentId } = props;

    const onRemovePress = async () => {
        try {
            const { accountRemoved } = await removeAccount(id);
            if (accountRemoved) alert('Removed');
            else alert('Error');
            navigation.goToRoot(componentId);
        } catch (error) {
            alert(error);
        }
    };
    const createTwoButtonAlert = () =>
        Alert.alert(
            'Warning!',
            'This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: onRemovePress, style: 'destructive' }
            ],
            { cancelable: false }
        );

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TopNavbar title="Account Settings"></TopNavbar>
            <View style={styles.container}>
                <View style={{ margin: 0 }}></View>
                <View style={styles.top}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{name}</Text>
                        <Text style={styles.titleIDText}>{issuer}</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button
                        title="Remove Account"
                        style={styles.btn}
                        onPress={createTwoButtonAlert}
                    />
                    <View style={{ margin: 10 }} />
                </View>
                <View style={{ margin: 5 }}></View>
            </View>
        </View>
    );
};

AccountSettings.options = {
    topBar: {
        visible: false
    }
};

export default AccountSettings;
