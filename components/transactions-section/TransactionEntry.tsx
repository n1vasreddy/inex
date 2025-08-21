import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, Button } from 'react-native';
import { View } from '@/components/Themed';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import { TextInput } from 'react-native-paper';
import { DropdownField } from '@/components/dropdown-field/DropdownField';
import { transactionEntryStyles } from '@/constants/styles';
import TextInputField from '../text-input-field/TextInputField';
import { labels, options } from '@/constants/constants';
import CustomButton from '@/components/custom-button/CustomButton';
// import { DatePickerInput } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';
import DatePickerField from '@/components/date-picker-field/DatePickerField';

export default function TransactionEntry() {
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState<string | undefined>(
        'Debit',
    );
    const [date, setDate] = useState(new Date());
    const [source, setSource] = useState('HDFC Bank');
    const [category, setCategory] = useState('Food');
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

    // const onChange = (event, selectedDate) => {
    //     setDate(selectedDate);
    // };

    // const showMode = (currentMode) => {
    //     DateTimePickerAndroid.open({
    //         value: date,
    //         onChange,
    //         mode: currentMode,
    //         is24Hour: true,
    //     });
    // };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

    return (
        <PaperProvider>
            <View style={transactionEntryStyles.container}>
                <TextInputField
                    style={transactionEntryStyles.input}
                    label={labels.amount}
                    value={amount}
                    onChangeText={setAmount}
                />

                <DropdownField
                    label="Transaction Type"
                    // placeholder="Transaction Type"
                    value={transactionType}
                    onSelect={setTransactionType}
                    options={options.transactionType}
                />
                <DatePickerField selectedDate={date} onDateChange={setDate} />

                {/* <Text style={{ borderColor: 'red', borderWidth: 1 }}>
                selected: {date.toLocaleString()}
            </Text>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" /> */}

                {/* <Picker
                selectedValue={source}
                onValueChange={(itemValue) => setSource(itemValue)}
            >
                <Picker.Item label="HDFC Bank" value="HDFC Bank" />
                <Picker.Item label="ICICI Bank" value="ICICI Bank" />
            </Picker>

            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Grocery" value="Grocery" />
            </Picker> */}

                <TextInputField
                    style={transactionEntryStyles.textArea}
                    label={labels.note}
                    value={note}
                    onChangeText={setNote}
                />

                <CustomButton onPress={handleSubmit} icon="arrow-right">
                    {labels.submit}
                </CustomButton>

                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        </PaperProvider>
    );
}
