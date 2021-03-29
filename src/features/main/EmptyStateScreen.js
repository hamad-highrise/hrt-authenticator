import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Button } from '../../components';

const EmptyState = (props) => {
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

export default EmptyState;

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
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    },
    title: {
        marginLeft: 20
    }
});
