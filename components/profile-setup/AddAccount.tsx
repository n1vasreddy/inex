import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import TextInput from '@/components/text-input-field/TextInputField';
import Button from '@/components/custom-button/CustomButton';
import { PaperProvider } from 'react-native-paper';
import RadioButtonInput from '@/components/radio-group-input/RadioButtonInput';
import { labels, options } from '@/constants/constants';
import colors from '@/constants/Colors';
import { IAccountInfo } from '@/store/accounts';
import { useNavigation } from 'expo-router';
import useAccounts from '@/hooks/useAccounts';

const AddAccount = (props: IAccountInfo) => {
    const colorScheme = useColorScheme() ?? 'light';
    const navigation = useNavigation();
    const [isUpdate, setIsUpdate] = useState(false);
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [balance, setBalance] = useState('');
    const { addAccount, updateAccountInfo } = useAccounts();

    useEffect(() => {
        if (props?.value) {
            setIsUpdate(true);
            props?.balance && setBalance(props.balance.toString());
            props?.type && setType(props.type);
            props?.label && setLabel(props.label);
        }
    }, [props?.value]);

    const handleSubmit = async () => {
        const payload = {
            label,
            value,
            type,
            balance: Number(balance),
        };
        if (isUpdate) {
            await updateAccountInfo(payload);
        } else {
            await addAccount(payload);
        }
        navigation.goBack();
    };

    return (
        <PaperProvider>
            <View
                style={[
                    {
                        backgroundColor: colors[colorScheme].background,
                    },
                    styles.container,
                ]}
            >
                <TextInput
                    label={labels.label}
                    value={label}
                    onChangeText={(text) => setLabel(text)}
                />
                <TextInput
                    label={labels.value}
                    value={value}
                    disabled={isUpdate}
                    onChangeText={(text) => setValue(text)}
                />
                <RadioButtonInput
                    options={options.accountTypeOptions}
                    disabled={isUpdate}
                    onValueChange={(value) => setType(value)}
                    value={type}
                    label={labels.accountType}
                />
                <TextInput
                    label={labels.balance}
                    value={balance}
                    onChangeText={(text) => setBalance(text)}
                />
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    textColor={colors.babyBlue}
                >
                    {labels.submit}
                </Button>
            </View>
        </PaperProvider>
    );
};

export default AddAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        padding: 16,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: colors.fuchsia,
    },
});
