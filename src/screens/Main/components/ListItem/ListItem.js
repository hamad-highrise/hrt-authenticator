import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ item, onPress }) => {
    const onListPress = () => {
        onPress();
    };
    return (
        <TouchableOpacity style={styles.listitem} onPress={onListPress}>
            <View style={styles.listitemView}>
                <View>
                    <Text style={styles.listitemText}>
                        {item['account_name']}
                    </Text>
                    <Text style={styles.listitemID}> {item['issuer']} </Text>
                </View>

                <Image
                    source={require('../../../../assets/icons/plane.png')}
                    style={{
                        width: 30,
                        height: 20,
                        marginLeft: -10,
                        marginTop: -3
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};
ListItem.propTypes = {
    onPress: PropTypes.any
};

const styles = StyleSheet.create({
    listitem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 2,
        borderColor: '#eee'
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
