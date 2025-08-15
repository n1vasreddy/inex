import { StyleSheet, StatusBar } from 'react-native';

export const transactionTileStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    note: {
        color: '#666',
        fontSize: 12,
        marginTop: 5,
    },
    amount: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateTime: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    }
})

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