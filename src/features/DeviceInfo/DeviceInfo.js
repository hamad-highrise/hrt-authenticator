import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TopNavbar } from '../../components';
import { Navigation } from 'react-native-navigation';

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
    const BiometricOption = () => {
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
    const onPressHandlerGetStarted = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.GetStarted',
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
            <TopNavbar title="" onPress={() => alert('zxcvb')}></TopNavbar>

            <View style={{ margin: 25 }} />
            <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>
                Device Information
            </Text>
            <View
                style={{
                    backgroundColor: 'lightgrey',
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                {/* li */}
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={AccountConnected}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Version
                        </Text>
                        <Text style={styles.listitemText}>2.4.5</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={ProcessComplete}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify SDK version
                        </Text>
                        <Text style={styles.listitemText}>2.1.2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    onPress={BiometricOption}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify User Guide
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
                            Remove this record
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
                            Terms and Conditions
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
                            Privacy Policy
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
                            Third Party Notices
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                {/* end li */}
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
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        justifyContent: 'space-between',
        backgroundColor: 'lightgrey'
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
        height: 20,
        transform: [{ rotate: '180deg' }]
    }
});

export default DeviceInfo;
