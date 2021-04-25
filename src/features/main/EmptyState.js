import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Button, Topbar } from '../../components';
import navigation from '../../navigation';

const EmptyState = (props) => {
    return (
        <>
            {/* <Topbar title="Test Title" /> */}
            <View style={styles.container}>
                {/* <StatusBar barStyle="light-content" backgroundColor="#555" /> */}
                <View style={{ flex: 0.4 }}>
                    <Image
                        source={require('../../assets/images/AddAccIBM.png')}
                        style={{ width: 200, height: 200 }}></Image>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Text style={styles.welcome}>No Account Yet !</Text>
                    <Text style={styles.instructions}>
                        Add your device and see them here
                    </Text>
                    <View style={styles.bar}></View>
                    <Button
                        label="Connect Account"
                        style={styles.btn}
                        onPress={() =>
                            navigation.goTo(
                                props.componentId,
                                navigation.screenIds.qrScan
                            )
                        }
                    />
                </View>
            </View>
        </>
    );
};

export default EmptyState;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1
    },
    welcome: {
        fontSize: 28,
        textAlign: 'center',
        // margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    instructions: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'lightgrey'
        // marginBottom: 5
    },
    btn: {
        // backgroundColor: '#0f62fe',
        // paddingVertical: 23,
        // paddingHorizontal: 12,
        // borderWidth: 0,
        // borderRadius: 0,
        // // width: Dimensions.get('window').width * 0.7,
        // alignSelf: 'center'
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
