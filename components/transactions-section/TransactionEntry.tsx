import React, { useEffect, useState } from 'react';
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
import ToggleInput from '@/components/toggle-input/ToggleInput';
import { ITransactionInfo } from '@/store/transactions';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import useTransactions from '@/hooks/useTransactions';
import { useNavigation } from 'expo-router';

export default function TransactionEntry(props: ITransactionInfo) {
    const navigation = useNavigation();
    const [isUpdate, setIsUpdate] = useState(false);
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState<boolean>(false);
    const [date, setDate] = useState(new Date());
    const [paymentMethod, setPaymentMethod] = useState<any>('hdfc3');
    const [category, setCategory] = useState<any>('');
    const [note, setNote] = useState('');
    const { add, update, refresh } = useTransactions();

    useEffect(() => {
        if (props?.id) {
            setIsUpdate(true);
            props?.amount && setAmount(props.amount.toString());
            props?.trxType &&
                setTransactionType(props.trxType === 'true' ? true : false);
            props?.date && setDate(new Date(date));
            props?.paymentMethod && setPaymentMethod(props.paymentMethod);
            props?.category && setCategory(props.category);
            props?.note && setNote(props.note);
        }
    }, [props?.id]);

    const handleSubmit = async () => {
        const payload = {
            id: isUpdate ? props.id : uuid(),
            amount: Number(amount),
            trxType: String(transactionType),
            date: date.toJSON(),
            paymentMethod,
            category,
            note,
        };
        if (isUpdate) {
            await update(payload);
        } else {
            await add(payload);
        }
        await refresh();
        navigation.goBack();
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
                    label={labels.paymentMethod}
                    value={paymentMethod}
                    onSelect={setPaymentMethod}
                    options={options.paymentMethods}
                    style={transactionEntryStyles.commonStyles}
                />

                <DropdownField
                    label={labels.category}
                    value={category}
                    onSelect={setCategory}
                    options={options.category}
                    style={transactionEntryStyles.commonStyles}
                />

                <DatePickerField
                    date={date}
                    onDateChange={setDate}
                    label={labels.transactionDate}
                    style={transactionEntryStyles.commonStyles}
                />

                <TextInputField
                    style={transactionEntryStyles.commonStyles}
                    label={labels.note}
                    value={note}
                    onChangeText={setNote}
                />

                <ToggleInput
                    value={transactionType}
                    onValueChange={setTransactionType}
                    label={
                        transactionType
                            ? options.transactionType.true.label
                            : options.transactionType.false.label
                    }
                    style={transactionEntryStyles.commonStyles}
                    thumbColor={
                        transactionType
                            ? options.transactionType.true.color
                            : options.transactionType.false.color
                    }
                    trackColor={options.transactionTypeTrackColor}
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
