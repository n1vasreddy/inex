import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { DropdownField } from '@/components/dropdown-field/DropdownField';
import { transactionEntryStyles } from '@/constants/styles';

export default function TransactionEntry() {
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('Debit');
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

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={transactionEntryStyles.container}>
            <Text style={transactionEntryStyles.title}>Add a transaction</Text>
            <View
                style={transactionEntryStyles.separator}
                lightColor="#aaa"
                darkColor="rgba(255,255,255,0.1)"
            />

            <TextInput
                style={transactionEntryStyles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(text) => setAmount(parseInt(text, 10))}
            />

            <DropdownField
                label="Transaction Type"
                placeholder="Transaction Type"
                value={transactionType}
                onSelect={(itemValue) => setTransactionType(itemValue)}
                options={[
                    { label: 'Debit', value: 'debit' },
                    { label: 'Credit', value: 'credit' },
                ]}
            />

            {/* <Picker
                ref={pickerRef}
                selectedValue={transactionType}
                onValueChange={(itemValue) => setTransactionType(itemValue)}
            >
                <Picker.Item label="Debit" value="Debit" />
                <Picker.Item label="Credit" value="Credit" />
            </Picker> */}

            <Text>selected: {date.toLocaleString()}</Text>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />

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

            <TextInput
                style={transactionEntryStyles.textArea}
                placeholder="Note"
                multiline={true}
                numberOfLines={4}
                value={note}
                onChangeText={(text) => setNote(text)}
            />

            <Button title="Submit" onPress={handleSubmit} />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}
