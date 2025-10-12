import React, { useEffect } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, StatusBar } from 'react-native';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { RootState, useAppSelector } from '@/store/store';
import { options } from '@/constants/constants';
import useTransactions from '@/hooks/useTransactions';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionsSection() {
    const { refresh, exportToExcel } = useTransactions();
    const transactions = useAppSelector(
        (state: RootState) => state.transactions.data,
    );

    useEffect(() => {
        if (!transactions.length) refresh();
    }, []);

    return (
        <>
            <SafeAreaProvider>
                <View style={transactionSectionStyles.exportContainer}>
                    <Pressable
                        onPress={exportToExcel}
                        style={transactionSectionStyles.exportButton}
                    >
                        <Text
                            variant="titleMedium"
                            style={transactionSectionStyles.exportTextStyle}
                        >
                            Export
                        </Text>
                        <MaterialCommunityIcons
                            name="file-excel"
                            size={23}
                            color="#127c43"
                        />
                    </Pressable>
                </View>
                <SafeAreaView style={transactionSectionStyles.container}>
                    <FlatList
                        data={transactions}
                        renderItem={(props: {
                            item: ITransactionTileProps;
                        }) => (
                            <TransactionTile
                                {...props.item}
                                color={
                                    props.item?.trxType === 'true'
                                        ? options.transactionType.true.color
                                        : options.transactionType.false.color
                                }
                            />
                        )}
                        keyExtractor={(item: any) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}

const transactionSectionStyles = StyleSheet.create({
    container: {
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
    exportContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    exportTextStyle: { textDecorationLine: 'underline' },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        margin: 20,
    },
});
