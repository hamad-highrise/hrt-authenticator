import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Switch,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TopNavbar } from '../../../components';
import { utilities } from '../../../native-services';
import { values } from '../../../global';

const SecurityAssessment = (props) => {
    const navigation = useNavigation();

    const [isEnabled, setIsEnabled] = useState(true);
    const [info, setInfo] = useState({
        rooted: false,
        biometricEnrolled: true
    });
    const init = () => {};
    const toggleSwitch = () => {
        if (isEnabled) utilities.allowScreenshot();
        else utilities.preventScreenshot();
        setIsEnabled((isEnabled) => !isEnabled);
    };
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

                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device not rooted
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </View>
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Biometrics Enrolled
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </View>
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device security is enabled
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </View>
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            {values.APP_NAME} up to date
                        </Text>
                        <Image
                            source={require('../../../assets/icons/tickblack2.png')}
                            style={styles.img}
                        />
                    </View>
                </View>

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
                <View
                    onPress={() => utilities.preventScreenshot()}
                    style={styles.listitemBottom}>
                    <View
                        style={[
                            styles.listitemView,
                            { width: Dimensions.get('window').width * 0.8 }
                        ]}>
                        <View>
                            <Text style={styles.listitemTextBottom}>
                                Prevent Screen Capture
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
                </View>
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
