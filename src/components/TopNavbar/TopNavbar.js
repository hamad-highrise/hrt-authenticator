import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from '../IconButton';

const TopNavbar = ({
    imageUrlBack,
    imageUrlRight,
    imageBackOnPress,
    title,
    param,
    RightIcon
}) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    {RightIcon == 'YES' ? (
                        <View
                            style={[
                                styles.iconBtnContainer,
                                { marginLeft: 18 }
                            ]}>
                            <IconButton onPress={imageBackOnPress}>
                                <Image
                                    // source={{ uri: {imageUrlRight} }}
                                    source={require('../../assets/icons/settings2black.png')}
                                    style={styles.iconBtn}
                                />
                            </IconButton>
                        </View>
                    ) : null}
                    <View style={{ margin: 30 }}>
                        <Text style={styles.titleMainText}>{title}</Text>
                    </View>

                    <View
                        style={[styles.iconBtnContainer, { marginRight: 18 }]}>
                        <IconButton onPress={imageBackOnPress}>
                            <Image
                                // source={{ uri: imageUrlBack }}
                                source={require('../../assets/icons/crossblack.png')}
                                style={styles.iconBtn}
                            />
                        </IconButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
    imageUrlBack: '../../assets/icons/backarrowinvert.png',
    imageUrlRight: '../../assets/icons/settings2invert.png',
    title: 'HRT',
    imageBackOnPress: () => alert('Back'),
    RightIcon: 'NO'
};

export default TopNavbar;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 27,
        paddingHorizontal: 12,

        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },

    header: {
        flexDirection: 'row',
        height: 49,
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingTop: 10,
        margin: -30
    },
    title: {
        marginLeft: 20
    },
    titleMainText: {
        color: 'black',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        zIndex: 10000
    },
    iconBtnContainer: {},
    iconBtn: {
        width: 25,
        height: 25,
        marginTop: 10
    }
});
