import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Button } from '../../components';

const GetStarted = (props) => {
    return (
        <View>
            <View>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: '#424c58'
                    }}>
                    Get Started
                </Text>
            </View>
            <View style={styles.container}>
                <View style={{ margin: 25 }} />
                <View>
                    <Text style={styles.heading}>
                        Sign in securely from anywhere
                    </Text>
                </View>

                <View>
                    <Image
                        source={require('../../assets/images/2typeAcc2.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{ margin: 55 }} />
                <View>
                    <Button
                        title="Connect an account"
                        style={styles.btnInvert}
                        onPress={() => alert('where to go ?')}
                    />
                </View>
            </View>
        </View>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
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
        backgroundColor: '#1c9db2',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.7
    },
    title: {
        marginLeft: 20
    }
});
