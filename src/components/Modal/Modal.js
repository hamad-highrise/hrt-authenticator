import React, { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import { Button } from '../../components';
const myModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalMainText}>WARNING</Text>
                        <Text style={styles.modalText}>This action is not revertable. Deleting account will prevent you from Authentication. Are you sure?</Text>
                        <View style={{flexDirection:'row-reverse'}}>
                            <TouchableHighlight
                                style={styles.btnM}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.btnMInvert}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyleInvert}>No</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <Text style={styles.btnMInvert}>Show Modal</Text>
            </TouchableHighlight> */}

            <Button
                title="Show Modal"
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        // borderRadius: 20,
        padding: 35,
        width:Dimensions.get('window').width * 0.85,
        // height:Dimensions.get('window').height * 0.3,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomColor:'maroon',
        borderBottomWidth:5,
    },
    openButton: {
        // backgroundColor: '#F19444',
        // borderRadius: 20,
        // padding: 10,
        elevation: 2,

        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 25,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.7
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textStyleInvert: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
  },
    modalMainText: {
        marginBottom: 15,
        // textAlign: 'center',
        fontSize:20
    },
    modalText: {
      marginBottom: 15,
      // textAlign: 'center'
      fontSize:18
    },
    btnM: {
      
        backgroundColor: '#a24e12',
        borderRadius: 2,
        paddingVertical: 12,
        // paddingHorizontal: 5,
        fontSize: 14,
        color: 'black',
        borderWidth: 0,
        fontWeight: 'bold',
        // alignSelf: 'flex-end',
        textTransform: 'uppercase',

        width: Dimensions.get('window').width * 0.2,
        // alignItems: 'flex-start',
        borderColor:'#a24e12',
        borderWidth:2,
    },
    btnMInvert: {
        backgroundColor: 'white',
        borderRadius: 2,
        paddingVertical: 12,
        // paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 0,
        fontWeight: 'bold',
        // alignSelf: 'flex-end',
        textTransform: 'uppercase',
        width: Dimensions.get('window').width * 0.2,
        borderColor:'orange',
        borderBottomWidth:2,
        elevation:2,
    }
});

export default myModal;
