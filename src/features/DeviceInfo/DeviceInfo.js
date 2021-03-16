import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TopNavbar } from '../../components';
import { Navigation } from 'react-native-navigation';
import navigation from '../../navigation';
const DeviceInfo = (props) => {
    const AccountConnected = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.NotifyAccountConnected',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
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
        navigation.goTo(
            props.componentId,
            navigation.screenIds.authTransaction
        );
    }, [props.componentId]);
    const onPressHandlerAuthTransaction = useCallback(() => {
        navigation.goTo(
            props.componentId,
            navigation.screenIds.authTransaction
        );
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
    const onPressHandlerprivacypolicy = useCallback(() => {
        navigation.goTo(props.componentId, navigation.screenIds.privacypolicy);
    }, [props.componentId]);
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
    return (
        <View style={styles.container}>
            <TopNavbar title="" onPress={() => alert('zxcvb')}></TopNavbar>

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
                {/* li */}
                {/*                 
                <TouchableOpacity
                    style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Version
                        </Text>
                        <Text style={styles.listitemText}>2.4.5</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify SDK version
                        </Text>
                        <Text style={styles.listitemText}>2.1.2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={()=> alert('go to browser')}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify User Guide
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={()=> alert('go to next screen')}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Terms and Conditions
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={()=> alert('go to next screen')}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Privacy Policy
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={()=> alert('go to next screen')}>
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
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={()=> alert('go to next screen')}>
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
                 */}
                {/* end li */}
                {/* REMOVE BELOW RECORDs */}
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={onPressHandleBiometricOption}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            onPressHandleBiometricOption
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
                    onPress={onPressHandlerAuthTransaction}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            {/* Privacy Policy */}onPressHandlerAuthTransaction
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
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
                    onPress={onPressHandlerprivacypolicy}>
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
    titleText: {
        color: 'black',
        fontSize: 18
    },
    listitem: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: '#f8f8f8',
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
    listitemID: {
        fontSize: 12,
        flex: 1
    },
    img: {
        width: 20,
        height: 20
    }
});

export default DeviceInfo;
