import React, { useCallback } from 'react';
import navigation from '../../navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';

const ProcessComplete = ({ props, title }) => {
    // const onPressHandlerMain = useCallback(() => {
    //     navigation.goTo(props.componentId, navigation.screenIds.main);
    // }, [props.componentId]);
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/trophy.png')}
            />
            <View>
                <Text style={styles.welcome}>You're done!</Text>
                <Text style={styles.instructions}>
                    You can now use this app with your {title} account to verify
                    your identity.
                </Text>
            </View>

            <View style={{ marginTop: 110, marginBottom: 100 }}>
                <Button
                    title="Done"
                    onPress={()=>alert("Go to Main Screen")}
                    style={styles.btn}
                />
            </View>
        </View>
    );
};
ProcessComplete.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

ProcessComplete.defaultProps = {
    title: 'HBL SAM'
};

export default ProcessComplete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 25,
        paddingLeft: 25
    },
    welcome: {
        fontSize: 32,
        marginLeft: 20,
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    instructions: {
        marginLeft: 20,
        color: 'black',
        marginBottom: 5,
        fontSize: 16
    },
    image: {
        width: 240,
        height: 300
    },
    btn: {
        backgroundColor: '#0f62fe',
        paddingVertical: 23,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderRadius: 0,
        width: Dimensions.get('window').width * 0.7,
        alignSelf: 'center'
    }
});
