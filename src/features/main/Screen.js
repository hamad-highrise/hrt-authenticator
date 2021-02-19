import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList,   SafeAreaView, SectionList ,TouchableOpacity} from 'react-native';
import navigation from '../../navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';
import accountQueries from './queries';
import { IconButton } from '../../components';
import AccountList from './sectionList';
import { TopNavbar } from '../../components';

const Main = (props) => {
    const [accounts, setAccounts] = useState([]);

    const getAllAccounts = async () => {
        try {
            const mAccounts = await accountQueries.getAll();
            if (mAccounts.length > 0) {
                setAccounts(mAccounts);
            } else {
                // navigation.goTo(
                //     props.componentId,
                //     navigation.screenIds.emptyState
                // );
                // alert('No Accounts');
            }
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
        navigation.goTo(props.componentId, navigation.screenIds.addAccount);
    };
    const onItemPress = (id, name, issuer, secret) => {
        navigation.goTo(props.componentId, navigation.screenIds.accessCode, {
            id,
            name,
            issuer,
            secret
        });
    };
    const onPressHandlerAccessCode = () => {
        navigation.goTo(props.componentId, navigation.screenIds.accessCode);
    };

    const sampleAccountData = [
        { account_id: 0, account_name: 'local', issuer: 'server', type: 'SAM' },
        {
            account_id: 1,
            account_name: 'local',
            issuer: 'server',
            type: 'TOTP'
        },
        {
            account_id: 2,
            account_name: 'local',
            issuer: 'server',
            type: 'TOTP'
        },
        { account_id: 3, account_name: 'hamad', issuer: 'server', type: 'SAM' },
        { account_id: 4, account_name: 'local', issuer: 'server', type: 'SAM' }
    ];
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
            {/* <TopNavbar title="HRT Verify" /> */}
            <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandlerAccessCode}>
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
                    <Text style={styles.titleText}>HRT Verify</Text>
                </View>
                <View>
                    <IconButton onPress={onPressHandler}>
                        <Image
                            source={require('../../assets/icons/addinvert.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View>
            </View>
            <View style={{ marginLeft: 5, marginRight: 5, marginTop:0 }} />
            <AccountList accounts={accounts} onListItemPress={onItemPress} />

        </View>
    );
};

Main.options = {
    topBar: {
        visible: false
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black',
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1
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

{
    /* <View style={styles.header}>
                <View>
                    <IconButton onPress={onPressHandlerDeviceInfo}>
                        <Image
                            source={require('../../assets/icons/settings2.png')}
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
                            source={require('../../assets/icons/add.png')}
                            style={{ marginLeft: -10, marginTop: -3 }}
                        />
                    </IconButton>
                </View>
            </View> */
}
