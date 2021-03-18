import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from '../../components';
import PropTypes from 'prop-types';
import { TopNavbar } from '../../components';
const SecurityAssessment = () => {
    return (
        <View style={styles.container}>
            <TopNavbar title="" onPress={() => alert('nothing')}></TopNavbar>

            <View style={{ margin: 25 }} />
            <Text style={{ marginLeft: 20, marginBottom: 10, fontSize: 15 }}>
                Status
            </Text>
            <View
                style={{
                    backgroundColor: '#d3d3d380',
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}>
                {/* li */}
                                
                <TouchableOpacity
                    style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Android version up to date
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}>
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            Device not rooted
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    >
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                           Biometrics enrolled
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    >
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                           Device security is enabled
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listitem}
                    >
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify up to date
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
                        />
                    </View>
                </TouchableOpacity>
                
                {/* end li */}
                
            </View>

            <View style={{
                    backgroundColor: '#d3d3d380',
                    borderColor: 'grey',
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    marginTop:150,
                }}>
                <TouchableOpacity
                    style={styles.listitemBottom}
                    >
                    <View style={styles.listitemView}>
                        <Text style={styles.listitemText}>
                            IBM Security Verify up to date
                        </Text>
                        <Image
                            source={require('../../assets/icons/backarrowblack.png')}
                            style={styles.img}
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
    },
    listitemBottom:{
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        // borderBottomWidth: 1,
        // borderColor: 'lightgrey',
        justifyContent: 'space-between',
        marginVertical:30,
    }
});
