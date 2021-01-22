import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from '../../components';

const TopNavbar = ({imageUrlBack,    imageUrlRight,imageBackOnPress,    title,    param}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ backgroundColor: '#2b2d32', height: 65, marginLeft:18}}>
                    <IconButton onPress={imageBackOnPress}>
                        <Image
                            source={{ uri: imageUrlBack }}
                            style={{
                                width: 25,
                                height: 35,
                                marginLeft: 6,
                                marginTop: 10
                            }}
                        />
                    </IconButton>
                </View>

                <View>
                    <Text style={styles.titleMainText}> {title} </Text>
                </View>

                <View style={{ backgroundColor: '#2b2d32', height: 65, marginRight:18 }}>
                    <IconButton onPress={imageBackOnPress}>
                        <Image
                            source={{ uri: imageUrlRight }}
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
        </View>
    );
};

TopNavbar.propTypes = {
    imageUrlBack: PropTypes.string,
    imageUrlRight: PropTypes.string,
    imageBackOnPress: PropTypes.func,
    title: PropTypes.string,
    param: PropTypes.any,
    styles: PropTypes.any
};

TopNavbar.defaultProps = {
    imageUrlBack: '../../../../assets/icons/backarrowinvert.png',
    imageUrlRight: '../../../../assets/icons/settings2invert.png',
    // imageBackOnPress: '',
    title: 'HRT'
};

export default TopNavbar;

const styles = StyleSheet.create({
    container: {
        // flex:1,
        elevation: 8,
        backgroundColor: 'pink',
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
        elevation: 8,
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#525961',
        borderBottomWidth: 1,
        backgroundColor: '#424c58',
        padding: -50,
        margin: -30,
    },
    title: {
        marginLeft: 20
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
});
