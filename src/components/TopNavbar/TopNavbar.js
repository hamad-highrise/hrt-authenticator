import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from '../../components';

const TopNavbar = ({
    imageUrlBack,
    imageUrlRight,
    imageBackOnPress,
    title,
    param
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconBtnContainer}>
                    <IconButton onPress={imageBackOnPress}>
                        <Image
                            // source={{ uri: imageUrlBack }}
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 4
                                }
                            ]}
                        />
                    </IconButton>
                </View>

                <View>
                    <Text style={styles.titleMainText}> {title} </Text>
                </View>

                <View
                    style={{
                        backgroundColor: '#2b2d32',
                        height: 55,
                        marginRight: 18
                    }}>
                    <IconButton onPress={imageBackOnPress}>
                        <Image
                            // source={{ uri: {imageUrlRight} }}
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 5
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
    // imageUrlBack: "https://cdn.iconscout.com/icon/free/png-512/settings-410-461751.png",
    imageUrlBack: '../../assets/icons/addinvert.png',
    imageUrlRight: '../../assets/icons/settings2invert.png',
    title: 'HRT',
    imageBackOnPress: () => alert('Back')
};

export default TopNavbar;

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        borderRadius: 2,
        paddingVertical: 18,
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
        paddingTop: 10,
        margin: -30
    },
    title: {
        marginLeft: 20
    },
    titleMainText: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconBtnContainer: {
        backgroundColor: '#2b2d32',
        height: 55,
        marginLeft: 18
    },
    iconBtn: {
        width: 30,
        height: 30,
        marginTop: 14
    }
});
