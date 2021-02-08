import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Button
} from 'react-native';
import navigation from '../../navigation';

const EmptyState = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#555" />
            <Image
                source={require('../../assets/images/highrise-logo.png')}></Image>
            <Text style={styles.welcome}>No Account Yet !</Text>
            <Text style={styles.instructions}>
                Add your device and see them here
            </Text>
            <Button
                title="Connect Account"
                onPress={() =>
                    navigation.goTo(
                        props.componentId,
                        navigation.screenIds.addAccount
                    )
                }
            />
        </View>
    );
};

EmptyState.options = {
    topBar: {
        visible: false
    }
};

export default EmptyState;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    instructions: {
        textAlign: 'center',
        color: 'maroon',
        marginBottom: 5
    }
});
