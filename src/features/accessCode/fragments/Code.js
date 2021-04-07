import React from 'react';
import { View, Text } from 'react-native';
import { PercentageCircle } from '../../../components';
export default ({ otp, counter }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <PercentageCircle
            borderWidth={6}
            radius={140}
            percent={(counter / 30) * 100}
            color="#0f62fe99">
            {otp !== '######' && (
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 42,
                        letterSpacing: 7
                    }}>
                    {otp.split('').join('')}
                </Text>
            )}

            <Text style={{ marginTop: 20, fontSize: 15 }}>
                {counter} seconds
            </Text>
        </PercentageCircle>
    </View>
);
