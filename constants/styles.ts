import { StyleSheet, StatusBar } from 'react-native';

export const transactionSectionStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
    },
    container1: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#93DA97',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 18,
    },
});

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
