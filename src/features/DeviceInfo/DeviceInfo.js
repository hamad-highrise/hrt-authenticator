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
import { TopNavbar } from '../../components';
import navigation from '../../navigation';
const DeviceInfo = (props) => {
    const onPressHandleProcessComplete = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.processcomplete
        );
    }, [props.componentId]);
    const onPressHandleBiometricOption = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.biometricOption
        );
    }, [props.componentId]);

    const onPressHandlerWelcome = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.welcome);
    }, [props.componentId]);

    const onPressHandlerSplashScreen = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.splash);
    }, [props.componentId]);
    const onPressHandlerEmptyState = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.emptyState);
    }, [props.componentId]);
    const onPressHandlerError = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.error);
    }, [props.componentId]);
    const onPressHandlerGetStarted = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.getstarted);
    }, [props.componentId]);
    const onPressHandlerNotifySuccess = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.notifysuccess);
    }, [props.componentId]);
    const [privacypolicymodalVisible, privacypolicysetModalVisible] = useState(
        false
    );

    const onPressHandlertermandcondition = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.termandcondition
        );
    }, [props.componentId]);
    const onPressHandlerthirdpartynotice = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.thirdpartynotice
        );
    }, [props.componentId]);
    const onPressHandlersecurityassessment = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.securityassessment
        );
    }, [props.componentId]);
    return (
        <View style={styles.container}>
            <TopNavbar
                title=""
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
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandleBiometricOption}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                           Version
                        </Text>
                        <Text style={styles.listitemText}>2.4.5</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerWelcome}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            {/* Remove this record */}onPressHandlerWelcome
                        </Text>
                        <Text style={styles.listitemText}>2.1.2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerSplashScreen}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            {/* Third Party Notices */}
                            onPressHandlerSplashScreen
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerEmptyState}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            {/* Third Party Notices */}onPressHandlerEmptyState
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerGetStarted}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlerGetStarted
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerNotifySuccess}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlerNotifySuccess
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerError}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlerError
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandleProcessComplete}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandleProcessComplete
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={() => privacypolicysetModalVisible(true)}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlerprivacypolicy
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
                    onPress={onPressHandlertermandcondition}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlertermandcondition
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlerthirdpartynotice}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlerthirdpartynotice
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandlersecurityassessment}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandlersecurityassessment
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
