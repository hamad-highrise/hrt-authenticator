import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';
import { Button } from '../../components';
import navigation from '../../navigation';

const EmptyState = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#555" />
            <View style={{ flex: 0.4 }}>
                <Image
                    source={require('../../assets/images/addAccount.png')}
                    style={{ width: 150, height: 150, marginTop: 40 }}></Image>
            </View>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.welcome}>No Account Yet !</Text>
                <Text style={styles.instructions}>
                    Add your device and see them here
                </Text>
                <View style={styles.bar}></View>
                <Button
                    title="Connect Account"
                    style={styles.btnInvert}
                    onPress={() =>
                        navigation.goTo(
                            props.componentId,
                            navigation.screenIds.addAccount
                        )
                    }
                />
            </View>
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
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    instructions: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'lightgrey',
        marginBottom: 5
    },
    btnInvert: {
        backgroundColor: '#1c9db2',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
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
