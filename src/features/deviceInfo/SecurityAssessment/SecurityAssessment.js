import React, { useEffect, useState } from 'react';
import { View, Text, Image, Switch, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TopNavbar } from '../../../components';
import { values } from '../../../global';
import { biometrics, utilities } from '../../../native-services';

import styles from './assessment.styles';
import assets from '../../../assets';

const SecurityAssessment = (props) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [data, setData] = useState({
        rooted: false,
        biometricsEnrolled: true,
        isDeviceSecure: false
    });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const isRooted = await (await utilities.getDeviceInfo()).rooted;
            const isDeviceSecure = await utilities.checkDeviceSecurity();
            const biometricsEnrolled = await (
                await biometrics.isSensorAvailable()
            ).available;
            setData({ rooted: isRooted, biometricsEnrolled, isDeviceSecure });
        })();
    }, []);

    const toggleSwitch = () => {
        if (isEnabled) utilities.allowScreenshot();
        else utilities.preventScreenshot();
        setIsEnabled((isEnabled) => !isEnabled);
    };
    return (
        <View style={styles.container}>
            <TopNavbar title="" imageBackOnPress={() => navigation.goBack()} />
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
                <View style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device not rooted
                        </Text>
                        <Image
                            source={
                                !data.rooted
                                    ? assets.icons.tickBlack
                                    : assets.icons.crossBlack
                            }
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
                            source={
                                data.biometricsEnrolled
                                    ? assets.icons.tickBlack
                                    : assets.icons.crossBlack
                            }
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
                            source={
                                data.isDeviceSecure
                                    ? assets.icons.tickBlack
                                    : assets.icons.crossBlack
                            }
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
            </View>

            {Platform.OS === 'android' && (
                <View style={styles.spacer}>
                    <View style={styles.listitemBottom}>
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
                                trackColor={{
                                    false: '#767577',
                                    true: '#81b0ff'
                                }}
                                thumbColor={isEnabled ? '#0f62fe' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default SecurityAssessment;
