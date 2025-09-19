import { StyleSheet, StatusBar } from 'react-native';

export const transactionEntryStyles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight || 0,
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
    },
    input: {},
    dropdown: {},
    textArea: {},
});
