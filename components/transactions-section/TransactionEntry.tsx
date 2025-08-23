import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { View } from '@/components/Themed';
import { DropdownField } from '@/components/dropdown-field/DropdownField';
import { transactionEntryStyles } from '@/constants/styles';
import TextInputField from '../text-input-field/TextInputField';
import { labels, options } from '@/constants/constants';
import CustomButton from '@/components/custom-button/CustomButton';
import { Provider as PaperProvider } from 'react-native-paper';
import DatePickerField from '@/components/date-picker-field/DatePickerField';
import { TextInput } from 'react-native-paper';

export default function TransactionEntry() {
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState<string | undefined>(
        'debit',
    );
    const [date, setDate] = useState(new Date());
    const [source, setSource] = useState<string | undefined>('hdfc3');
    const [category, setCategory] = useState<string | undefined>('');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        console.log({
            amount,
            transactionType,
            date,
            source,
            category,
            note,
        });
    };

    return (
        <PaperProvider>
            <View style={transactionEntryStyles.container as any}>
                <TextInputField
                    style={transactionEntryStyles.commonStyles}
                    label={labels.amount}
                    value={amount}
                    onChangeText={setAmount}
                    left={<TextInput.Icon icon="currency-inr" />}
                />

                <DropdownField
                    label="Transaction Type"
                    value={transactionType}
                    onSelect={setTransactionType}
                    options={options.transactionType}
                    style={transactionEntryStyles.commonStyles}
                />

                <DropdownField
                    label="Source"
                    value={source}
                    onSelect={setSource}
                    options={options.source}
                    style={transactionEntryStyles.commonStyles}
                />

                <DropdownField
                    label="Category"
                    value={category}
                    onSelect={setCategory}
                    options={options.category}
                    style={transactionEntryStyles.commonStyles}
                />

                <DatePickerField selectedDate={date} onDateChange={setDate} />

                <TextInputField
                    style={transactionEntryStyles.commonStyles}
                    label={labels.note}
                    value={note}
                    onChangeText={setNote}
                />

                <CustomButton
                    onPress={handleSubmit}
                    icon="arrow-right"
                    style={transactionEntryStyles.button}
                >
                    {labels.submit}
                </CustomButton>

                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        </PaperProvider>
    );
}
