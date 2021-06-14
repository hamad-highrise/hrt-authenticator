import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../../components';
import screensIdentifiers from '../../../navigation/screensId';
import assets from '../../../assets';

const ProcessComplete = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { serviceName } = params;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={assets.images.processComplete}
            />
            <View>
                <Text style={styles.welcome}>You're done!</Text>
                <Text style={styles.instructions}>
                    You can now use this app with your
                    <Text style={{ fontWeight: 'bold' }}> {serviceName} </Text>
                    account to verify your identity.
                </Text>
            </View>
            <Button
                label="Done"
                onPress={() => {
                    navigation.navigate(screensIdentifiers.main);
                }}
            />
        </View>
    );
};
ProcessComplete.propTypes = {
    serviceName: PropTypes.string
};

ProcessComplete.defaultProps = {
    serviceName: 'HBL SAM'
};

export default ProcessComplete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 25,
        paddingLeft: 25
    },
    welcome: {
        fontSize: 32,
        marginLeft: 20,
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    instructions: {
        marginLeft: 20,
        color: 'black',
        marginBottom: 50,
        fontSize: 16
    },
    image: {
        width: 200,
        height: 200
    }
});
