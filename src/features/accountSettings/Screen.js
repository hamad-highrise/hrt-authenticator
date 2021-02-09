import React from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import navigation from '../../navigation';
import {
    removeAccount,
    getAuthIdByAccount,
    getTokenByAccount,
    getEnrollmentEndpoint
} from './queries';
import { TopNavbar, Button } from '../../components';
import { removeSamAccount } from './api';

const AccountSettings = (props) => {
    const { id, name, issuer, componentId } = props;

    const onRemovePress = async () => {
        try {
            // const authId = await getAuthIdByAccount(id);
            // const token = await getTokenByAccount(id);
            // const endpoint = await getEnrollmentEndpoint(id);
            // const result = await removeSamAccount(endpoint, authId, token);
            // if (result.respInfo.status === 200) {
            await removeAccount(id);
            // }
            // alert(JSON.stringify(result.data));
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

    // contolled input
    // const [firstName, setFirstName] = useState('');
    // end

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
