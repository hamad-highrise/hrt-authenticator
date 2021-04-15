import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

const TermAndCondition = () => {
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
                    Term And Condition
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

export default TermAndCondition;

const styles = StyleSheet.create({
    container: {
        margin: 25,
        marginTop: 10
    },
    btnInvert: {
        paddingVertical: 18,
        paddingHorizontal: 15,
        width: Dimensions.get('window').width * 0.25,
        alignSelf: 'flex-end'
    },
    content: {
        fontSize: 15,
        lineHeight: 23,
        color: '#424c58'
    }
});
