import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import screensIdentifiers from '../../../navigation/screensId';
import { accountActions } from '../../actions.public';
import { vibrate } from '../../../native-services/utilities';
import registerDevice, { isUnique, createAccount, parser } from '../services';
import { constants } from '../../../global';

const { tryJSONParser, uriParser } = parser;

function useQR() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isConnected } = useSelector(({ utils }) => utils);
    const [isFocused, setIsFocused] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    useFocusEffect(() => {
        const unsubFocusListener = navigation.addListener('focus', () =>
            setIsFocused(true)
        );
        const unsubBlurListener = navigation.addListener('blur', () =>
            setIsFocused(false)
        );
        return () => {
            unsubBlurListener();
            unsubFocusListener();
        };
    });

    const barcodeRecognized = async (_barcode) => {
        //Barcode can't be read multiple time
        if (!isRead) {
            setIsRead(true);
            vibrate();
            const { value, valid } = tryJSONParser(_barcode.data);
            if (valid) {
                //MMFA Account is being Started
                if (isConnected) {
                    setLoading(true);
                    try {
                        const result = await registerDevice(value);

                        result
                            ? navigation.navigate(
                                  screensIdentifiers.success,
                                  result
                              )
                            : alert('Invalid QR');
                    } catch (error) {
                        setLoading(false);
                        navigation.navigate(screensIdentifiers.main);
                    }
                }
            } else {
                setLoading(true);
                //TOTP Account Flow
                const parsedData = uriParser(_barcode.data);
                if (!parsedData) {
                    alert('Invalid QR Code');
                    navigation.goBack();
                } else {
                    const account = {
                        name: parsedData.label.account,
                        issuer:
                            parsedData.label.issuer ||
                            parsedData.query.issuer ||
                            'N/A',
                        secret: parsedData.query.secret,
                        type: constants.ACCOUNT_TYPES.TOTP
                    };
                    try {
                        if (await isUnique(account)) {
                            await createAccount({ account });
                            console.warn('created');
                            setLoading(false);
                            navigation.navigate(screensIdentifiers.main);
                        } else {
                            setLoading(false);
                            alert(
                                'Error: An account can not be registered multiple times.'
                            );
                            navigation.goBack();
                        }
                    } catch (error) {
                        alert('Unable to register an account.');
                        setLoading(false);
                    }
                }
            }
            dispatch(accountActions.initiateAccounts());
        }
    };

    const onManualCode = useCallback(() => {
        navigation.navigate(screensIdentifiers.accountForm);
    }, [JSON.stringify(navigation)]);

    return {
        isFocused,
        navigation,
        isConnected,
        loading,
        onManualCode,
        barcodeRecognized
    };
}

export default useQR;
