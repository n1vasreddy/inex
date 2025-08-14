import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    StyleSheet,
    TextInput,
    Button,
    // Alert,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DropdownPicker from '@/components/dropdown-picker/DropdownPicker';

export default function AddTransactionScreen() {
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('Debit');
    const [date, setDate] = useState(new Date());
    const [source, setSource] = useState('HDFC Bank');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        // Alert.alert(`${amount} ${transactionType} ${date} ${source} ${category} ${note}`);
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
        <View style={styles.container}>
            <Text style={styles.title}>Add a transaction</Text>
            <View
                style={styles.separator}
                lightColor="#aaa"
                darkColor="rgba(255,255,255,0.1)"
            />

            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(text) => setAmount(parseInt(text, 10))}
            />

            <DropdownPicker
                selectedValue={transactionType}
                onValueChange={(itemValue) => setTransactionType(itemValue)}
                dropdownItems={[
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
                style={styles.textArea}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        marginHorizontal: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: 200,
    },
});
