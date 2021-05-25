import React from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';

import { values } from '../../global';
import { Button } from '../../components';
import { colors } from '../../theme';

const Rooted = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.img}
                    source={require('../../assets/images/error_cross.png')}
                />
            </View>
            <Text style={styles.title}>Failure</Text>
            <Text style={styles.subTitle}>
                Your device appears to be rooted. To ensure security of your
                data, {values.APP_NAME} cannot run on rooted devices.
            </Text>
            <Button
                style={styles.button}
                label="OK"
                onPress={BackHandler.exitApp}
            />
        </View>
    );
};

export default Rooted;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    img: {
        width: 150,
        height: 150
    },
    subTitle: {
        marginHorizontal: 35,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.SUBTITLE
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 25
    },
    button: { position: 'absolute', bottom: 0, left: 0, width: '100%' }
});
