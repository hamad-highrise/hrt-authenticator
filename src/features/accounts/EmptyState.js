import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from 'react-native-config';

import { Button } from '../../components';
import screensIdentifiers from '../../navigation/screensId';
import { colors } from '../../theme';
import assets from '../../assets';
import { values } from '../../global';

const EmptyState = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                }}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={
                            config.PRODUCT_FLAVOR === 'alfalah'
                                ? require('../../assets/alfalah/images/alfalah-logo.png')
                                : assets.images.logo
                        }
                    />
                </View>
            </View>
            <View
                style={{
                    flex: 0.5,
                    width: '80%',
                    backgroundColor: 'white',
                    justifyContent: 'center'
                }}>
                <Text style={styles.instructions}>
                    Strengthen your account security. Use your mobile device to
                    verify your identity when signing in to{' '}
                    <Text style={{ color: 'grey' }}>{values.COMPANY_NAME}</Text>
                    's applications.
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.bar}></View>
                <Button
                    label="Connect Account"
                    rippleColor={colors.SECONDARY}
                    onPress={() =>
                        navigation.navigate(screensIdentifiers.qrScan)
                    }
                />
            </View>
        </View>
    );
};

export default EmptyState;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logoContainer: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    logo: { width: 200, height: 200 },
    instructions: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'lightgrey',
        fontSize: 16,
        fontFamily: 'arial'
    },

    bar: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        width: Dimensions.get('window').width * 0.5,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    }
});
