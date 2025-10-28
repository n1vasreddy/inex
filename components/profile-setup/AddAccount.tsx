import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import TextInput from '@/components/text-input-field/TextInputField';
import Button from '@/components/custom-button/CustomButton';
import { PaperProvider } from 'react-native-paper';
import RadioButtonInput from '@/components/radio-group-input/RadioButtonInput';
import { labels } from '@/constants/constants';
import colors from '@/constants/Colors';

const AddAccount = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [balance, setBalance] = useState('');

    const options = [
        { label: 'Credit', value: 'credit' },
        { label: 'Standard', value: 'standard' },
        { label: 'Brokerage', value: 'brokerage' },
    ];

    const handleSubmit = () => {
        // Handle form submission logic here
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
                    onChangeText={(text) => setValue(text)}
                />
                <RadioButtonInput
                    options={options}
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
