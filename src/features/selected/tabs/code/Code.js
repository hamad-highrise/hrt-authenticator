import React from 'react';
import { View, Text } from 'react-native';

import { PercentageCircle } from '../../../../components';
import { colors } from '../../../../theme';
import styles from './code.styles';

export default ({ otp, counter, suspected }) => (
    <View style={styles.container}>
        {!suspected ? (
            <PercentageCircle
                borderWidth={6}
                radius={140}
                percent={(counter / 30) * 100}
                color={colors.PRIMARY || '#0f62fe99'}>
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

                <Text style={styles.counterText}>{counter} seconds</Text>
            </PercentageCircle>
        ) : (
            <View>
                <Text style={styles.warningText}>
                    TOTP has been disabled. Kindly chech if a SAM is working and
                    this device is still registered with it.
                </Text>
            </View>
        )}
    </View>
);
