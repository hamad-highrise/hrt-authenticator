import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList,   SafeAreaView, SectionList ,TouchableOpacity} from 'react-native';
import { IconButton } from '../../components';
import { Navigation } from 'react-native-navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import ListItem from './components/ListItem/ListItem';
import account from '../../util/sqlite/account';
import { SplashScreen } from '../SplashScreen/SplashScreen';

const Main = (props) => {
    const [accounts, setAccounts] = useState([]);

    const getAllAccounts = async () => {
        try {
            const results = await account.getAllAccounts();
            let mAccounts = [];
            for (let i = 0; i < results[0].rows.length; i++) {
                mAccounts.push(results[0].rows.item(i));
            }
            setAccounts(mAccounts);
        } catch (error) {
            console.warn(error);
        }
    };

    useNavigationComponentDidAppear(
        () => {
            getAllAccounts();
        },
        { componentId: props.componentId }
    );

    useEffect(() => {
        getAllAccounts();
    }, []);
    const onPressHandler = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AddAccountScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerAccessCode = (id, name, issuer, secret) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccessCodeScreen',
                passProps: {
                    id: id,
                    name: name,
                    issuer: issuer,
                    secret: secret
                },
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressMMFAcc = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.AccessCodeScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const onPressHandlerDeviceInfo = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'authenticator.DeviceInfoScreen',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };
    const [items, setItems] = useState([
        { id: 'test.isd', text: 'HBL pim' },
        { id: 'hbl.support', text: 'HBL sam' }
    ]);

    const DATA = [
        {
          title: "MULTI FACTOR AUTH ACCOUNTS",
          data: ["HBL SAM", "HBL PIM", "HBL Support", "HBL Example"]
        },
 
      ];
      
    const Item = ({ title }) => (
        <View style={styles.SListitem}>
          <Text style={styles.SListtitle}>{title}</Text>
          <TouchableOpacity onPress={()=>alert("Go to Access Code Screen")}>
          <Image
                source={require('../../assets/icons/backarrowinvert.png')}
                style={{
                    width: 32,
                    height: 30,
                    transform:[{rotate:'180deg'}],
                    backgroundColor:'#e57f01',
                    borderRadius:10,
                }}
            />
        </TouchableOpacity>
   
        </View>
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    {/* <IconButton onPress={() => alert('Device Info Sectionn')}> */}
                    <IconButton onPress={onPressHandlerDeviceInfo}>
                        <Image
                            source={require('../../assets/icons/settings2invert.png')}
                            style={[
                                styles.iconBtn,
                                {
                                    marginLeft: 5,
                                    marginTop: 2
                                }
                            ]}
                        />
                    </IconButton>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Accounts</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image
                            source={require('../../assets/icons/addinvert.png')}
                            style={{ marginLeft: -10, marginTop: -3, }}
                        />
                    </IconButton>
                </View>
            </View>

            <View style={{ marginLeft: 5, marginRight: 5 }} />
            <FlatList
                style={{ margin: 5 }}
                data={accounts}
                renderItem={({ item: accounts }) => (
                    <ListItem
                        item={accounts}
                        onPress={onPressHandlerAccessCode}
                    />
                )}
                keyExtractor={(item) => '' + item['account_id']}
            />

            {/*  */}
            <SafeAreaView style={styles.container}>
                <SectionList
                    style={{backgroundColor:'#424c58'}}
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.SListheader}>{title}</Text>
                    )}
                />
            </SafeAreaView>
            {/*  */}
        </View>
    );
};

Main.options = {};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor:'black',
        elevation:8,
    },
    title: {
        marginLeft: 20
    },
    titleText: {
        color:'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconBtn: {
        width: 37,
        height: 37
    },
    SListitem: {
        backgroundColor: "white",
        padding: 20,
        marginVertical: 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:28,
    },
    SListheader: {
        fontSize: 20,
        padding: 9,
        backgroundColor: "#424c58",
        color:'#b5b6bd',
        fontWeight: 'bold',
        alignSelf:'center',
        lineHeight:25,
      },
    SListtitle: {
        fontSize: 20,
        color: '#424c58',
        fontWeight: 'bold',
      }
});

export default Main;
