import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from '../../components';

const myTopNavbar = ({ imageUrlBack, imageUrlRight, title, param, ...styles }) => {

    return (

  
            <View style={styles.header}>

                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('Go to Back screen')}>
                        <Image
                            source={{uri: imageUrlBack}}
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
                    <Text style={styles.titleMainText}> {title} </Text>
                </View>
                
                <View style={{ backgroundColor: '#2b2d32', height: 54 }}>
                    <IconButton onPress={() => alert('Go to Back screen')}>
                        <Image
                            source={{uri: imageUrlRight}}
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

    );
};

myTopNavbar.propTypes = {
    imageUrlBack: PropTypes.string,
    imageUrlRight: PropTypes.string,
    title: PropTypes.string,
    param: PropTypes.any,
    styles: PropTypes.any
};

myTopNavbar.defaultProps = {
    imageUrlBack: '../../../../assets/icons/backarrowinvert.png',
    imageUrlRight: '../../../../assets/icons/backarrowinvert.png',
    title: 'hrt authenticator'
};

export default myTopNavbar;

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        backgroundColor: '#009688',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    label: {
        fontSize: 14,
        color: '#e57f01',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    large: {},
    small: {},
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
    title: {
        marginLeft: 20,
    },
    titleCodeText: {
        color: 'maroon',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
        marginLeft: Dimensions.get('window').width * 0.03,
        marginRight: Dimensions.get('window').width * 0.07
    }
});
