import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { authTransaction, rejectTransaction } from './services';
import PropTypes from 'prop-types';
import navigator from '../../navigation';
import styles from './styles';
import { TopNavbar } from '../../components';
const AuthProcess = (props) => {
    const {
        id,
        message,
        endpoint,
        componentId,
        createdAt,
        transactionId
    } = props;
    const onApproveBiometric = async () => {
        try {
            const authResult = await authTransaction(id, endpoint);
        } catch (error) {
            alert(error);
        } finally {
            navigator.goToRoot(componentId);
        }
    };
    const onReject = async () => {
        try {
            const authResult = await rejectTransaction({
                accId: id,
                tEndpoint: endpoint
            });
        } catch (error) {
            alert(error);
        } finally {
            navigator.goToRoot(componentId);
        }
    };
    const [viewDetails, setFragment] = useState('YES');
    const onDetailsSelect = () => setFragment('NO');
    const onBackSelect = () => setFragment('YES');
    return (
        <View style={styles.container}>
            <View>
                {viewDetails == 'YES' ? (
                    <View
                        style={{
                            marginTop: 50,
                            paddingTop: 25,
                            paddingRight: 25,
                            paddingLeft: 25
                        }}>
                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={styles.welcome}>
                                Please verify using fingerprint
                            </Text>
                            <Text style={styles.SListheader}>HRT server</Text>
                            <Text style={styles.SListtitle}>
                                configation #12343654
                            </Text>
                        </View>
                        <View style={{ marginTop: 30 }} />
                        <TouchableOpacity
                            style={styles.listitem}
                            onPress={onDetailsSelect}>
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
                ) : (
                    <View>
                        <TopNavbar
                            title="Request details"
                            RightIcon="NO"
                            imageBackOnPress={onBackSelect}></TopNavbar>
                        <View
                            style={{
                                padding: '9%'
                            }}>
                            <View>
                                <Text style={styles.SListheader}>
                                    Confirmation
                                </Text>
                                <Text style={styles.SListtitle}>#12343654</Text>
                                <View style={styles.bar}></View>
                            </View>
                            <View>
                                <Text style={styles.SListheader}>
                                    Created On
                                </Text>
                                <Text style={styles.SListtitle}>
                                    Tue Mar 02 11:37:29 GMT+05:00 2021
                                </Text>
                                <View style={styles.bar}></View>
                            </View>
                            <View>
                                <Text style={styles.SListheader}>Message</Text>
                                <Text style={styles.SListtitle}>
                                    Please verify using fingerprint
                                </Text>
                                <View style={styles.bar}></View>
                            </View>
                        </View>
                    </View>
                )}
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                <TouchableOpacity
                    style={[
                        styles.decisionBox,
                        {
                            backgroundColor: 'powderblue',
                            padding: 10,
                            paddingLeft: 20
                        }
                    ]}
                    onPress={() => alert('Approve')}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Deny</Text>
                    </View>

                    <Image
                        source={require('../../assets/icons/crossblack.png')}
                        style={styles.iconBtn}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.decisionBox,
                        { backgroundColor: 'steelblue', padding: 10 }
                    ]}
                    onPress={() => alert('Approve')}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Approve</Text>
                    </View>

                    <Image
                        source={require('../../assets/icons/tick.png')}
                        style={styles.iconBtn}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

AuthProcess.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string,
    endpoint: PropTypes.string.isRequired
};

AuthProcess.defaultProps = {
    message: 'Default Message'
};

AuthProcess.options = {
    topBar: {
        visible: false
    }
};

export default AuthProcess;
