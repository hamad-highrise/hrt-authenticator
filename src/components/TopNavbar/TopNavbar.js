import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from '../../components';

const TopNavbar = ({
    imageUrlBack,
    imageUrlRight,
    imageBackOnPress,
    title,
    param,
    RightIcon
}) => {

    const [rIcon, setRight] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.iconBtnContainer, { marginLeft: 18 }]}>
                    <IconButton onPress={imageBackOnPress}>
                        <Image
                            // source={{ uri: imageUrlBack }}
                            source={require('../../assets/icons/backarrowinvert.png')}
                            style={styles.iconBtn}
                        />
                    </IconButton>
                </View>

                <View>
                    <Text style={styles.titleMainText}> {title} </Text>
                </View>

                {RightIcon == "YES" ? (
                    <View
                        style={[styles.iconBtnContainer, { marginRight: 18 }]}>
                        <IconButton onPress={imageBackOnPress}>
                            <Image
                                // source={{ uri: {imageUrlRight} }}
                                source={require('../../assets/icons/settings2invert.png')}
                                style={styles.iconBtn}
                            />
                        </IconButton>
                    </View>
                ) : (
                    <Text></Text>
                )}
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
    styles: PropTypes.any,
    RightIcon: PropTypes.string
};

TopNavbar.defaultProps = {
    // imageUrlBack: "https://cdn.iconscout.com/icon/free/png-512/settings-410-461751.png",
    imageUrlBack: '../../assets/icons/addinvert.png',
    imageUrlRight: '../../assets/icons/settings2invert.png',
    title: 'HRT',
    imageBackOnPress: () => alert('Back'),
    RightIcon: 'NO'
};

export default TopNavbar;

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        borderRadius: 2,
        paddingVertical: 18,
        paddingHorizontal: 12
    },
    large: {},
    small: {},
    header: {
        elevation: 10,
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: 'black',
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
        backgroundColor: 'black',
        height: 55
    },
    iconBtn: {
        width: 30,
        height: 30,
        marginTop: 14,
        marginLeft: 5,
    }
});
