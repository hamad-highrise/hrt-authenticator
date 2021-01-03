import React, { useState } from 'react';
import { View, TextInput, Switch } from 'react-native';

const AccountForm = (props) => {
    const { manual } = props;
    const [isTimeBased, setTimeBased] = useState(false);
    const [account, setAccount] = useState({
        name: '',
        companyName: '',
        secret: ''
    });

    const onChangeHandler = (name) => (value) => {
        setAccount((account) => ({
            ...account,
            [name]: value
        }));
    };

    const toggleSwitch = () => {
        setTimeBased((prevState) => !prevState);
    };

    return (
        <View>
            <View>
                <TextInput
                    value={account.name}
                    onChangeText={() => onChangeHandler('name')}
                />
                <TextInput
                    value={account.companyName}
                    onChangeText={() => onChangeHandler('companyName')}
                />
                {manual && (
                    <TextInput
                        value={account.secret}
                        onChangeText={() => onChangeHandler('secret')}
                    />
                )}
                <Switch onValueChange={toggleSwitch} value={isTimeBased} />
            </View>
        </View>
    );
};

export default AccountForm;
