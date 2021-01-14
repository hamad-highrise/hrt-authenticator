import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import { Navigation } from 'react-native-navigation';
const ListItem = ({item}) => {

    return(
        <TouchableOpacity style={styles.listitem}>
            <View style={styles.listitemView}>
                <Text style={styles.listitemText}> {item.text} </Text>
                <Text style={styles.listitemID}> {item.id} </Text>
                <Image onPress={() => alert('See token')} source={require('../../../../assets/icons/plane.png')} style={{width:30,height:20,marginLeft:-10,marginTop:-3}} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listitem:{
        padding:15,
        backgroundColor:'#f8f8f8',
        borderBottomWidth:2,
        borderColor: '#eee'
    },
    listitemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    listitemText:{
        fontSize:18
    },
    listitemID:{
        fontSize:12,
        flex:1,
    },
});

export default ListItem;