//All first start logic will go here
// e.g. database setup and notification channel creation
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import navigator from '../../navigation';
import { initiateDb } from './init-db';
import { setInitiated } from '../../util/utilities';
import { TopNavbar, IconButton } from '../../components';

const WelcomeScreen = () => {
    useEffect(() => {
        init();
    }, []);
    const init = async () => {
        try {
            await initiateDb();
            await setInitiated();
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };
    const rIcon = 'YES';
    return (
        <View style={styles.container}>
            <View>
                <TopNavbar
                    title="Connect an account"
                    RightIcon="NO"></TopNavbar>
                {/* //TopNavbar */}

                {/* <View style={styles.header}>
                    {rIcon == 'YES' ? (
                        <View>
                            <View style={{ margin: 30 }}>
                                <Text style={styles.titleMainText}>
                                    {' '}
                                    sffsfsf{' '}
                                </Text>
                            </View>

                            <View style={{ marginRight: 18 }}>
                                <IconButton
                                    onPress={() => alert('back please')}>
                                    <Image
                                        // source={{ uri: {imageUrlRight} }}
                                        source={require('../../assets/icons/settings2invert.png')}
                                        style={styles.iconBtn}
                                    />
                                </IconButton>
                            </View>
                        </View>
                    ) : null}
                </View> */}
                {/* end topnavabr */}

                <View style={{paddingTop:25, paddingRight: 25, paddingLeft: 25 }}>
                    <Text style={styles.welcome}>
                        Please Verify using fingerprint
                    </Text>
                    <Text style={styles.SListheader}>HRT server</Text>
                    <Text style={styles.SListtitle}>configation #12343654</Text>
                    <View style={{ marginTop: 30 }} />
                    <TouchableOpacity
                        style={styles.listitem}
                        onPress={() => alert('details please')}>
                        <View style={styles.listitemView}>
                            <Text style={styles.listitemText}>
                                View details
                            </Text>
                            <Image
                                source={require('../../assets/icons/backarrowblack.png')}
                                style={styles.img}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end' //changed value of alignItems
                }}>
                <View
                    style={[
                        styles.decisionBox,
                        { backgroundColor: 'powderblue' }
                    ]}
                />

                <View
                    style={[
                        styles.decisionBox,
                        { backgroundColor: 'steelblue' }
                    ]}
                />
            </View>
        </View>
    );
};

WelcomeScreen.options = {
    topBar: {
        visible: false
    }
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 32,
        marginLeft: 20,
        margin: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    listitem: {
        padding: 13,
        backgroundColor: '#0f62fe10',
        justifyContent: 'space-between'
    },
    listitemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listitemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c58'
    },
    img: {
        width: 30,
        height: 28
    },
    SListheader: {
        fontSize: 20,
        padding: 2,
        marginLeft: 20,
        color: '#424c58',
        lineHeight: 25,
        fontWeight: 'bold'
    },
    SListtitle: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 20
    },
    // topbar
    header: {
        // elevation: 10,
        flexDirection: 'row',
        height: 49,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 0,
        paddingVertical: 27
        // paddingHorizontal: 5,
    },
    titleMainText: {
        color: 'black',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 25,
        height: 25,
        marginTop: 10
        // marginLeft: 5
    },
    decisionBox: {
        width: '50%',
        height: 60
    }
});
