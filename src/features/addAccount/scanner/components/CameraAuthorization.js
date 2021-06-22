import * as React from 'react';
import { Text, View } from 'react-native';

import { values } from '../../../../global';
import { Button } from '../../../../components';
import styles from './camera.auth.styles';

export default function PendingAuthorization({ rejected, refresh }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Camera Access Permission</Text>
            <Text style={styles.message}>
                {values.APP_NAME} needs to access camera for scanning QR codes.
            </Text>
            {rejected && (
                <Button
                    style={{
                        width: '40%',
                        height: 45,
                        marginTop: 30
                    }}
                    label={'Grant'}
                    onPress={refresh}
                />
            )}
        </View>
    );
}
