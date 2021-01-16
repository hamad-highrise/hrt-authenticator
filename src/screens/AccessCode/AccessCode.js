import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { IconButton } from '../../components';
const AccessCode = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('Go to Main screen')}>
                        <Image
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={{
                                width: 25,
                                height: 35,
                                marginLeft: 6,
                                marginTop: 10
                            }}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleMainText}>Access Code</Text>
                </View>
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('account settings')}>
                        <Image
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 9,
                                    marginTop: 12,
                                    width: 25,
                                    height: 30
                                }
                            ]}
                        />
                    </IconButton>
                </View>
            </View>

            <View style={{ margin: 0 }}></View>
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Server Name</Text>
                    <Text style={styles.titleIDText}>test.isd</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.title}>
                    <Text style={styles.titleCodeText}> 02 34 56</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.title}>
                    <Text style={styles.titleTimerText}> 00:05</Text>
                    {/* <Text style={styles.titleTimerNameText}>seconds</Text> */}
                </View>
            </View>
            <View style={{ margin: 5 }}></View>
        </View>
    );
};

AccessCode.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'lightgrey',
        padding: 20,
        margin: 10
    },
    header: {
        flexDirection: 'row',
        height: 53,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    title: {
        marginLeft: 20
    },
    titleText: {
        color: '#424c58',
        fontSize: 36,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    top: {
        flex: 0.2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    titleIDText: {
        fontSize: 24
    },
    middle: {
        flex: 0.1
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 48,
        fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        marginLeft: Dimensions.get('window').width * 0.11,
        marginRight: Dimensions.get('window').width * 0.18
    },
    bottom: {
        flex: 0.3
    },
    titleTimerText: {
        color: 'lightgrey',
        fontSize: 36,
        borderColor: 'darkgrey',
        borderBottomWidth: 5,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: '#424c58',
        width: 150,
        height: 140,
        borderRadius: 100 / 2
    },
    titleTimerNameText: {
        fontSize: 12,
        marginLeft: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.2
    }
});

export default AccessCode;