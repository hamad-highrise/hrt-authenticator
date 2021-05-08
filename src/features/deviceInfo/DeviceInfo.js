import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TopNavbar } from '../../components';
import screensIdentifiers from '../../navigation/screensId';

const DeviceInfo = (props) => {
    const navigation = useNavigation();
    const [privacypolicymodalVisible, privacypolicysetModalVisible] = useState(
        false
    );

    // const onPressHandlertermandcondition = useCallback(() => {
    //     navigation.goTo(
    //         props.componentId,
    //         navigation.screenIds.termandcondition
    //     );
    // }, [props.componentId]);
    // const onPressHandlerthirdpartynotice = useCallback(() => {
    //     navigation.goTo(
    //         props.componentId,
    //         navigation.screenIds.thirdpartynotice
    //     );
    // }, [props.componentId]);
    const onPressHandlersecurityassessment = useCallback(() => {
        // navigation.goTo(
        //     props.componentId,
        //     navigation.screenIds.securityassessment
        // );
        navigation.navigate(screensIdentifiers.main);
    }, [props.componentId]);
    return (
        <View style={styles.container}>
            <TopNavbar
                title="Utilities"
                imageBackOnPress={() =>
                    navigation.goBack(props.componentId)
                }></TopNavbar>

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
                {/* REMOVE BELOW RECORDs */}
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>Version</Text>
                        <Text style={styles.listitemText}>1.0.0</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Terms and Conditions
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>Privacy Policy</Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Third Party Notices
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>

                {/* test case modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={privacypolicymodalVisible}
                    onRequestClose={() => {
                        privacypolicysetModalVisible(
                            !privacypolicymodalVisible
                        );
                    }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <View>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 18,
                                    marginTop: 15,
                                    marginVertical: 10,
                                    fontWeight: 'bold',
                                    color: '#424c58'
                                }}>
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={styles.containerr}>
                            <SafeAreaView>
                                <ScrollView
                                    style={{
                                        height:
                                            Dimensions.get('window').height *
                                            0.76
                                    }}>
                                    <Text style={styles.content}>
                                        This IBM Mobile Application Privacy
                                        Statement ("Mobile Privacy Statement")
                                        explains the data IBM may collect on
                                        behalf of the entity that entitles you
                                        to use this IBM product offering. This
                                        Mobile Privacy Statement only applies to
                                        the information IBM may collect on
                                        behalf of that entity. It does not apply
                                        to the information that entity may
                                        collect for its own use.
                                    </Text>

                                    <Text style={styles.content}>
                                        Downloading, accessing, or otherwise
                                        using the App indicates that you have
                                        read this Mobile Privacy Statement and
                                        consent to its terms. If you do not
                                        consent to the terms of this Mobile
                                        Privacy Statement, do not proceed to
                                        download, access, or otherwise use the
                                        App.
                                    </Text>
                                    <Text style={styles.content}>
                                        IBM may collect the following
                                        information through the App:
                                        {'\n'}
                                        <Text>{'\u2022'}</Text> Personal
                                        information you may provide to download
                                        and use the App, including your email
                                        address, name, and password{'\n'}
                                        <Text>{'\u2022'}</Text> Information
                                        about your usage of the App, including
                                        crash logs and usage statistics
                                        <Text>{'\u2022'}</Text> Information
                                        about your device and its interaction
                                        with the App. including the type of
                                        mobile device you use with the App, its
                                        unique user ID, IP address, and
                                        operating system, and the type of mobile
                                        Internet browsers in use
                                    </Text>
                                </ScrollView>
                            </SafeAreaView>
                            <View style={{ margin: 10 }} />
                            <TouchableOpacity
                                onPress={() =>
                                    privacypolicysetModalVisible(
                                        !privacypolicymodalVisible
                                    )
                                }
                                style={styles.btnInvert}>
                                <Text style={styles.label}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* end test case modal */}
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlersecurityassessment}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Security Assessment
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>

                {/* end REMOVE BELOW RECORDs */}
            </View>
        </View>
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
