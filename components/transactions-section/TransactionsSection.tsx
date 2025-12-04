import React, { useEffect } from 'react';
import { FlatList, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { RootState, useAppSelector } from '@/store/store';
import { options } from '@/constants/constants';
import useTransactions from '@/hooks/useTransactions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import colors from '@/constants/Colors';

export default function TransactionsSection() {
    const colorScheme = useColorScheme();
    const { refresh, exportToExcel } = useTransactions();
    const transactions = useAppSelector(
        (state: RootState) => state.transactions.data,
    );

    useEffect(() => {
        if (!transactions.length) refresh();
    }, []);

    return (
        <>
            <SafeAreaProvider
                style={{
                    backgroundColor: colors[colorScheme ?? 'light'].background,
                }}
            >
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
                        style={{ width: '80%' }}
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
        paddingBottom: 90,
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
