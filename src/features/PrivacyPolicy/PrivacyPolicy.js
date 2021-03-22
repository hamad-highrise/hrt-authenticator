import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Button } from '../../components';
import PropTypes from 'prop-types';

const PrivacyPolicy = () => {
    return (
        <View>
            <View>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        marginTop: 15,
                        marginVertical:10,
                        fontWeight: 'bold',
                        color: '#424c58'
                    }}>
                    Privacy Policy
                </Text>
            </View>
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView style={{ height:Dimensions.get('window').height * 0.75}}>
                        <Text style={styles.content}>
                            This IBM Mobile Application Privacy Statement ("Mobile
                            Privacy Statement") explains the data IBM may collect on
                            behalf of the entity that entitles you to use this IBM
                            product offering. This Mobile Privacy Statement only
                            applies to the information IBM may collect on behalf of
                            that entity. It does not apply to the information that
                            entity may collect for its own use.
                        </Text>

                        <Text style={styles.content}>
                            Downloading, accessing, or otherwise using the App
                            indicates that you have read this Mobile Privacy
                            Statement and consent to its terms. If you do not
                            consent to the terms of this Mobile Privacy Statement,
                            do not proceed to download, access, or otherwise use the
                            App.
                        </Text>
                        <Text style={styles.content}>
                            IBM may collect the following information through the
                            App:
                            {"\n"}
                            <Text>{'\u2022'}</Text> Personal information you may provide to download
                            and use the App, including your email address, name, and
                            password{"\n"}
                            <Text>{'\u2022'}</Text> Information about your usage of the App,
                            including crash logs and usage statistics
                            <Text>{'\u2022'}</Text> Information about your device and its interaction with the App.
                            including the type of mobile device you use with the App, its unique user ID, IP address, and operating system, and the type of mobile Internet browsers in use
                        </Text>
                    </ScrollView>
                    
                </SafeAreaView>
                <View style={{ margin: 10 }} />
                <TouchableOpacity
                   onPress={() => alert('where to go ?')}
                    style={styles.btnInvert}>
                    <Text style={styles.label}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        margin: 19,
        marginTop: 10
    },
    heading: {
        fontSize: 30,
        marginLeft: 50,
        marginTop: 20,
        marginRight: 30,
        marginBottom: 30,
        lineHeight: 35
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.3,
        alignItems: 'center'
    },
    btnInvert: {
        paddingVertical: 18,
        paddingHorizontal: 15,
        width: Dimensions.get('window').width * 0.25,
        alignSelf: 'flex-end'
    },
    title: {
        marginLeft: 20
    },
    content: {
        fontSize: 15,
        lineHeight: 22,
        color: 'black',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: 'black',
        marginLeft: 15,
        fontWeight: 'bold'
    },
});
