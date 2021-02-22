import React, { useMemo } from 'react';
import { View, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './Item';
import SectionHeader from './Header';
import ListItemSeparator from './Separator';
import styles from './styles';

const AccountList = ({ accounts, onListItemPress }) => {
    const memoizedAccounts = useMemo(() => {
        return accounts.reduce(
            (prev, account) => {
                let [mmfa, totp] = prev;
                account.type === 'SAM'
                    ? mmfa.data.push(account)
                    : totp.data.push(account);
                return [mmfa, totp];
            },
            [
                { title: 'MMFA Accounts', data: [] },
                { title: 'TOTP Accounts', data: [] }
            ]
        );
    }, [JSON.stringify(accounts)]);

    return (
        <View style={styles.listContainer}>
            <SectionList
                style={{ backgroundColor: 'white' }}
                sections={memoizedAccounts}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                keyExtractor={(item, index) => item['account_id'] + index}
                renderItem={({ item }) => (
                    <ListItem account={item} onPress={onListItemPress} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionHeader title={title} />
                )}
            />
        </View>
    );
};

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountList;
