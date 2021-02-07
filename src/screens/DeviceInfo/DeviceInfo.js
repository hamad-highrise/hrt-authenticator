import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native';
import { TopNavbar } from '../../components';
import { Button } from '../../components';
import { Navigation } from 'react-native-navigation';
import ListItem from '../Main/components/ListItem/ListItem';

const DeviceInfo = (props) => {
    const onPressHandler = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.MainScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    // NOIFICATION SCREEEN WORK
    const AccountAddedSuccess = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.BiometricOption',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const ProcessComplete = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.NotifyProcessComplete',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const AccountConnection = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.BiometricOption',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerAccessCode = (id, name, issuer, secret) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccessCodeScreen',
                passProps: {
                    id: id,
                    name: name,
                    issuer: issuer,
                    secret: secret
                },
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerAccountSettings = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccountSettingsScreen',
                passProps: {
                    id: props.id,
                    refresh: props.refresh
                },
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerSplashScreen = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.SplashScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerEmptyState = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.EmptyStateScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerError = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.NotifyError',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    return (
        <View style={styles.container}>
            <TopNavbar
                title="Device Info"
                onPress={() => alert('zxcvb')}></TopNavbar>

            <View style={{ margin: 30 }} />

            {/* li */}
            <TouchableOpacity
                style={styles.listitem}
                onPress={AccountAddedSuccess}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Version*/}Notify Account Added Successfully
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listitem} onPress={ProcessComplete}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*IBM Security Verify SDK version*/}Notify Process
                        Complete
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={AccountConnection}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*IBM Security Verify User Guide*/}Biometric Option
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={onPressHandlerAccessCode}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Remove this record*/}Access Code
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={onPressHandlerError}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Terms and Conditions*/}Notify Error
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={onPressHandlerAccountSettings}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Privacy Policy*/}Account Settings
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={onPressHandlerSplashScreen}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Third Party Notices*/}SplashScreen
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.listitem}
                onPress={onPressHandlerEmptyState}>
                <View style={styles.listitemView}>
                    <Text style={styles.listitemText}>
                        {/*Security Assessment*/}EmptyState
                    </Text>
                    <Image
                        source={require('../../assets/icons/backarrowinvert.png')}
                        style={styles.img}
                    />
                </View>
            </TouchableOpacity>
            {/* end li */}
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
        fontSize: 18,
        fontWeight: 'bold'
    },

    listitem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 2,
        borderColor: '#eee',
        justifyContent: 'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c58'
    },
    listitemID: {
        fontSize: 12,
        flex: 1
    },
    img: {
        width: 32,
        height: 30,
        transform: [{ rotate: '180deg' }],
        backgroundColor: '#e57f01',
        borderRadius: 10
    },
    // Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default DeviceInfo;
