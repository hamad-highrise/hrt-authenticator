import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { authTransaction } from './services';
import PropTypes from 'prop-types';
import navigator from '../../navigation';
import styles from './styles';

const AuthProcess = (props) => {
    const { id, message, endpoint, componentId } = props;

    const onApprove = async () => {
        try {
            const authResult = await authTransaction(id, endpoint);
            alert('Authenticated Success');
        } catch (error) {
            alert(error);
        } finally {
            navigator.goToRoot(componentId);
        }
    };
    const onReject = () => {
        navigator.goToRoot(componentId);
        alert('Reject');
    };
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text>Auth Pendig</Text>
                    <Text>{message}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={onReject}
                    style={{ ...styles.footerButton, ...styles.footerBtnDeny }}>
                    <Text style={styles.btnText}>Deny</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onApprove}
                    style={{
                        ...styles.footerButton,
                        ...styles.footerBtnApprove
                    }}>
                    <Text style={styles.btnText}>Approve</Text>
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
