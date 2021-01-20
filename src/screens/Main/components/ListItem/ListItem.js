import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ item, onPress,param }) => {
    const onListPress = () => {
        onPress(param);
    };
    return (
        <TouchableOpacity style={styles.listitem} onPress={onListPress}>
            <View style={styles.listitemView}>
                <Text style={styles.listitemText}> {item.text} </Text>
                <Text style={styles.listitemID}> {item.id} </Text>
                <Image
                    source={require('../../../../assets/icons/backarrowinvert.png')}
                    style={{
                        width: 32,
                        height: 30,
                        transform:[{rotate:'180deg'}],
                        backgroundColor:'#e57f01',
                        borderRadius:10,
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};
ListItem.propTypes = {
    onPress: PropTypes.any,
};

const styles = StyleSheet.create({
    listitem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 2,
        borderColor: '#eee',
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18
    },
    listitemID: {
        fontSize: 12,
        flex: 1
    }
});

export default ListItem;
