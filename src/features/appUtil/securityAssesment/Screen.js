import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
    Dimensions,
    Animated
} from 'react-native';
import { TopNavbar } from '../../components';
const SecurityAssessment = () => {
    const fadeAnim = useRef(new Animated.Value(-20)).current;
    const fadeAnimOPA = useRef(new Animated.Value(0)).current;

    var mode = 1;
    const fadeOut = () => {
        console.log(mode);
        if (mode == 1) {
            Animated.timing(fadeAnim, {
                toValue: 12,
                duration: 500,
                useNativeDriver: false
            }).start();
            Animated.timing(fadeAnimOPA, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
            mode = 2;
        } else {
            Animated.timing(fadeAnim, {
                toValue: -20,
                duration: 500,
                useNativeDriver: false
            }).start();
            Animated.timing(fadeAnimOPA, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
            mode = 1;
        }
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
        <View style={styles.container}>
            <TopNavbar
                title=""
                onPress={() => alert('nothing')}
                imageBackOnPress={() =>
                    navigation.goBack(props.componentId)
                }></TopNavbar>

            <View style={{ margin: 25 }} />
            <Text style={{ marginLeft: 20, marginBottom: 10, fontSize: 15 }}>
                Status
            </Text>
            <View
                style={{
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                {/* li */}

                <TouchableOpacity style={styles.listitem} onPress={fadeOut}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Android version up to date
                        </Text>
                        <Image
                            source={require('../../../assets/icons/exclamation.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <Animated.View
                    style={{
                        marginVertical: fadeAnim,
                        opacity: fadeAnimOPA,
                        marginHorizontal: 20
                    }}>
                    <Text style={{ fontSize: 16 }}>
                        A new Android version is available. Please update your
                        device.
                    </Text>
                </Animated.View>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device not rooted
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Biometrics enrolled
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device security is enabled
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify up to date
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>

                {/* end li */}
            </View>

            <View
                style={{
                    backgroundColor: '#d3d3d380',
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    marginTop: 110
                }}>
                <TouchableOpacity style={styles.listitemBottom}>
                    <View
                        style={[
                            styles.listitemView,
                            { width: Dimensions.get('window').width * 0.8 }
                        ]}>
                        <View>
                            <Text style={styles.listitemTextBottom}>
                                IBM Security Verify up to date
                            </Text>
                            <Text style={styles.listitemSubTextBottom}>
                                Stop other applications from capturing your
                                sensitive screens
                            </Text>
                        </View>

                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#0f62fe' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SecurityAssessment;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginLeft: 20
    },
    listitem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'space-between',
        backgroundColor: '#d3d3d380'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8
    },
    listitemText: {
        fontSize: 17,
        color: '#424c58'
    },
    img: {
        width: 20,
        height: 20
    },
    listitemBottom: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    listitemTextBottom: {
        fontSize: 16,
        color: '#424c58'
    },
    listitemSubTextBottom: {
        fontSize: 14,
        color: '#424c5899'
    }
});
