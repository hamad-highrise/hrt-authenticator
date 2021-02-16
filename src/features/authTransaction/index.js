import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components';
import { authTransaction } from './services';

const AuthProcess = ({ id, message, endpoint }) => {
    const onApprove = async () => {
        try {
            const authResult = await authTransaction(id, endpoint);
            alert('Success');
        } catch (error) {
            alert(error);
        }
    };
    const onReject = () => {
        alert('Reject');
    };
    return (
        <View>
            <View>
                <Text>Auth Pendig</Text>
                <Text>{message}</Text>
            </View>
            <Button title="Approve" onPress={onApprove} />
            <Button title="Reject" onPress={onReject} />
        </View>
    );
};

export default AuthProcess;
