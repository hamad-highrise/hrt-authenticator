import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Item = ({ title }) => (
    <View style={styles.SListitem}>
        <Text style={styles.SListtitle}>{title}</Text>
        {/* <Image
            source={require('../../assets/icons/backarrowinvert.png')}
            style={{
                width: 32,
                height: 30,
                transform: [{ rotate: '180deg' }],
                backgroundColor: '#e57f01',
                borderRadius: 10
            }}
        /> */}
    </View>
);

const styles = StyleSheet.create({
    SListtitle: {
        fontSize: 24,
        color: '#b5b6bd'
    },
    SListitem: {
        backgroundColor: 'white',
        padding: 23,
        marginVertical: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 28
    }
});

export default Item;
