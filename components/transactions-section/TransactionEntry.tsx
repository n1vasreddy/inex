import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, StatusBar as StatusBarr } from 'react-native';
import { View } from '@/components/Themed';
import { DropdownField } from '@/components/dropdown-field/DropdownField';
import TextInputField from '../text-input-field/TextInputField';
import { labels, options } from '@/constants/constants';
import Button from '@/components/custom-button/CustomButton';
import { Provider as PaperProvider } from 'react-native-paper';
import DatePickerField from '@/components/date-picker-field/DatePickerField';
import { TextInput } from 'react-native-paper';
import ToggleInput from '@/components/toggle-input/ToggleInput';
import { ITransactionInfo } from '@/store/transactions';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import useTransactions from '@/hooks/useTransactions';
import { useNavigation } from 'expo-router';
import ChipSelectionInput from '@/components/chip-input/ChipSelectionInput';
import { RootState, useAppSelector } from '@/store/store';
import useTags from '@/hooks/useTags';
import colors from '@/constants/Colors';
import useAccounts from '@/hooks/useAccounts';

export default function TransactionEntry(props: ITransactionInfo) {
    const navigation = useNavigation();
    const tagsData = useAppSelector((state: RootState) => state.tags.data);
    const accounts = useAppSelector((state: RootState) => state.accounts.data);
    const [isUpdate, setIsUpdate] = useState(false);
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState<boolean>(false);
    const [trxDate, setTrxDate] = useState(new Date());
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [category, setCategory] = useState<string[]>([]);
    const [note, setNote] = useState('Transaction');
    const { add, update } = useTransactions();
    const { refreshTags } = useTags();
    const { refreshAccounts, updateBalance } = useAccounts();

    useEffect(() => {
        // Load tags in empty
        if (!tagsData.length) refreshTags();
        if (!accounts.length) refreshAccounts();
    }, []);

    useEffect(() => {
        // Set default payment method
        if (accounts.length) {
            const defaultAccount = accounts.find(
                (account) => account.isDefault === 'true',
            );
            defaultAccount && setPaymentMethod(defaultAccount.value);
        }
    }, [accounts]);

    useEffect(() => {
        if (props?.id) {
            setIsUpdate(true);
            props?.amount && setAmount(props.amount.toString());
            props?.trxType &&
                setTransactionType(props.trxType === 'true' ? true : false);
            props?.trxDate && setTrxDate(new Date(trxDate));
            props?.paymentMethod && setPaymentMethod(props.paymentMethod);
            props?.category && setCategory(props.category.split(','));
            props?.note && setNote(props.note);
        }
    }, [props?.id]);

    const handleSubmit = async () => {
        const payload = {
            id: isUpdate ? props.id : uuid(),
            amount: Number(amount),
            trxType: String(transactionType),
            trxDate: trxDate.toJSON(),
            paymentMethod,
            category: category.join(','),
            note,
        };
        const { balance } = accounts.find(
            (account) => account.value === paymentMethod,
        ) || { balance: 0 };
        if (isUpdate) {
            await updateBalance(
                paymentMethod,
                transactionType
                    ? balance + Number(amount) - props.amount
                    : balance - Number(amount) + props.amount,
            );
            await update(payload);
        } else {
            await updateBalance(
                paymentMethod,
                transactionType
                    ? balance + Number(amount)
                    : balance - Number(amount),
            );
            await add(payload);
        }
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
                    options={accounts}
                    style={transactionEntryStyles.commonStyles}
                />

                <ChipSelectionInput
                    data={tagsData}
                    label={labels.category}
                    value={category}
                    onChange={setCategory}
                    style={transactionEntryStyles.commonStyles}
                />

                <DatePickerField
                    trxDate={trxDate}
                    onDateChange={setTrxDate}
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

                <Button
                    onPress={handleSubmit}
                    labelStyle={{ color: colors.babyBlue }}
                    icon="arrow-right"
                    style={transactionEntryStyles.button}
                >
                    {labels.submit}
                </Button>

                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        </PaperProvider>
    );
}

const transactionEntryStyles = StyleSheet.create({
    container: {
        paddingTop: StatusBarr.currentHeight || 0,
        flex: 1,
        gap: 16,
        padding: 16,
    },
    commonStyles: {
        margin: 'auto',
        width: '75%',
        marginBottom: 0,
        marginTop: 0,
    },
    button: {
        margin: 'auto',
        width: '50%',
        marginBottom: 0,
        marginTop: 0,
        backgroundColor: colors.fuchsia,
    },
    input: {},
    dropdown: {},
    textArea: {},
});
