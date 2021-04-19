import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native';
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
    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#0f62fe" />
            <View style={styles.header}>
                {RightIcon == 'YES' ? (
                    <View style={[styles.iconBtnContainer, { marginLeft: 18 }]}>
                        <IconButton onPress={imageBackOnPress}>
                            <Image
                                // source={{ uri: {imageUrlRight} }}
                                source={require('../../assets/icons/settings2invert.png')}
                                style={styles.iconBtn}
                            />
                        </IconButton>
                    </View>
                ) : null}
                <View style={{ margin: 30 }}>
                    <Text style={styles.titleMainText}>{title}</Text>
                </View>

                <View style={[styles.iconBtnContainer, { marginRight: 18 }]}>
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
        // elevation: 8,
        paddingVertical: 27,
        paddingHorizontal: 12,
        // backgroundColor: 'black',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    large: {},
    small: {},
    header: {
        // elevation: 10,
        flexDirection: 'row',
        height: 49,
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomColor: 'lightgrey',
        // borderBottomWidth: 1,
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
    iconBtnContainer: {
        // backgroundColor: 'black',
        // transform:[{rotate:'45deg'}],
        // height: 55,
    },
    iconBtn: {
        width: 25,
        height: 25,
        marginTop: 10
        // marginLeft: 5,
    }
});
