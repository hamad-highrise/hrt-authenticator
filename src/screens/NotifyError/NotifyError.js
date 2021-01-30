import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Dimensions, Text, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { IconButton } from '../../components';
const NotifyError = (props) => {

    return (
        <View>
           
            <View style={styles.container}>
                <View
                    style={{
                        width: Dimensions.get('window').width * 0.4
                    }}>
                    <View title="Something WEnt WRONG"></View>
                    <Image
                        source={require('../../assets/images/addacc1.png')}
                        style={styles.image}
                    />
    <Text>This Device and your account "HBL XYZ" has been connected</Text>
                    <View style={{ margin: 20 }} />
                    <Button
                        title="Done"
                        style={{alignItems:'left'}}
                        onPress={()=>alert("Hide this notifiction")}
                    />
                </View>
            </View>
        </View>
    );
};
NotifyError.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.any
};

NotifyError.defaultProps = {
    title: 'Something went wrong..!'
};

export default NotifyError;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.5
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
    }

});
