import React from 'react';
import { View, SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './Item';
import SectionHeader from './Header';
import ListItemSeparator from './Separator';
import styles from './styles';

const AccountList = ({ accounts, onListItemPress }) => {
    const structuredAccounts = accounts.reduce(
        (prev, account) => {
            let [mmfa, totp] = prev;
            account.type === 'SAM'
                ? mmfa.data.push(account)
                : totp.data.push(account);
            return [mmfa, totp];
        },
        [
            { title: 'Multifactor authentication (MFA) accounts', data: [] },
            { title: 'One-time passcode (OTP) accounts', data: [] }
        ]
    );

    const renderNoContent = ({ section }) => {
        if (!section.data.length)
            return (
                <View
                    style={{
                        backgroundColor: 'orange',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            fontFamily: 'monospace',
                            color: 'white'
                        }}>
                        No Content!
                    </Text>
                </View>
            );
        return null;
    };

    return (
        <View style={styles.listContainer}>
            <SectionList
                style={{ backgroundColor: 'white' }}
                sections={structuredAccounts}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                keyExtractor={(item, index) => item['account_id'] + index}
                renderItem={({ item }) => (
                    <ListItem account={item} onPress={onListItemPress} />
                )}
                renderSectionHeader={({ section }) => (
                    <SectionHeader title={section.title} />
                )}
                renderSectionFooter={renderNoContent}
            />
        </View>
    );
};

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountList;
