import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';

import { Topbar } from '../../components';
import assets from '../../assets';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { colors } from '../../theme';

export default function BiometricInfo() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Topbar
                title=""
                topbarLeft={{
                    visible: true,
                    onPress: navigation.goBack,
                    image: {
                        source: assets.icons.backArrow,
                        width: '60%',
                        height: '60%'
                    }
                }}
            />
            <View style={styles.content}>
                <Image style={styles.img} source={assets.images.biometric} />
                <View style={styles.textContainer} >
                    <Text style={[styles.heading]}>Biometrics</Text>
                    <Text style={styles.textInstruction} >
                        {'Test Account'} uses biometrics as a verification
                        method to keep your account safe.
                    </Text>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.footer}>
                <Text style={[styles.text, styles.boldText]}>
                    To remove Biometrics
                </Text>
                <Text style={styles.text}>
                    1. Remove the device from your account provider
                </Text>
                <Text style={styles.text}>
                    2. Remove the account from {Config.APP_NAME}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    text: {
        margin: 3
    },
    boldText: {
        fontWeight: 'bold'
    },
    img: {
        width: 120,
        height: 120,
        marginBottom: 25
    },
    heading: {
        textAlign: 'left',
        fontSize: 36,
        color: colors.text.TITLE
    },
    textContainer: {
        padding: 25
    },
    textInstruction: {
        fontSize: 16,
        marginTop: 10,
        color: colors.text.TITLE
    }
});
