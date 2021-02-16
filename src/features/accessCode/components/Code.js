import React from 'react';
import { View, Text } from 'react-native';
import { PercentageCircle } from '../../../components';
export default ({ otp, counter }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PercentageCircle
            borderWidth={12}
            radius={130}
            percent={(counter / 30) * 100}
            color="#1c9db2">
            <Text style={{ fontWeight: 'bold', fontSize: 35 }}>
                {otp.split('').join(' ')}
            </Text>
            <Text>{counter} seconds</Text>
        </PercentageCircle>
    </View>
);
