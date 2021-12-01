import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Topbar } from '../../components';
import screensIdentifiers from '../../navigation/screensId';
import assets from '../../assets';

const DeviceInfo = (props) => {
    const navigation = useNavigation();

    const onPressHandlersecurityassessment = useCallback(() => {
        navigation.navigate(screensIdentifiers.securityassessment);
    }, [props.componentId]);
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

            <View style={{ margin: 25 }} />
            <Text style={{ marginLeft: 20, marginBottom: 10, fontSize: 15 }}>
                Device Information
            </Text>
            <View
                style={{
                    backgroundColor: '#d3d3d380',
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>Version</Text>
                        <Text style={styles.listitemText}>1.0.0</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlersecurityassessment}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Security Assessment
                        </Text>
                        <Image
                            source={assets.icons.angleBlack}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

DeviceInfo.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginLeft: 20
    },
    listitem: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 17,
        color: '#424c58'
    },
    img: {
        width: 20,
        height: 20
    },
    containerr: {
        justifyContent: 'space-between',
        margin: 19,
        marginTop: 10
    },
    content: {
        fontSize: 15,
        lineHeight: 22,
        color: 'black',
        marginBottom: 10
    },
    btnInvert: {
        marginVertical: 10,
        paddingHorizontal: 15,
        width: Dimensions.get('window').width * 0.25,
        alignSelf: 'flex-end'
    },
    label: {
        fontSize: 18,
        color: 'black',
        marginLeft: 15,
        fontWeight: 'bold'
    }
});

export default DeviceInfo;
