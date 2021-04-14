import React from 'react';
import { View, SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './Item';
import SectionHeader from './Header';
import ListItemSeparator from './Separator';
import styles from './styles';

const AccountList = ({ accounts, onListItemPress, componentId }) => {
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

    return (
        <View style={styles.listContainer}>
            <SectionList
                style={{ backgroundColor: 'white' }}
                sections={structuredAccounts}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                keyExtractor={(item, index) => item['id'] + index}
                renderItem={({ item }) => (
                    <ListItem
                        account={item}
                        onPress={onListItemPress}
                        componentId={componentId} // for the sake of navigation
                    />
                )}
                renderSectionHeader={({ section }) =>
                    section.data.length > 0 ? (
                        <SectionHeader title={section.title} />
                    ) : null
                }
            />
        </View>
    );
};

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountList;
