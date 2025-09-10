import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { transactionSectionStyles } from '@/constants/styles';
import { RootState, useAppSelector } from '@/store/store';
import { options } from '@/constants/constants';
import useTransactions from '@/hooks/useTransactions';

export default function TransactionsSection() {
    const { refresh } = useTransactions();
    const transactions = useAppSelector(
        (state: RootState) => state.transactions.data,
    );

    useEffect(() => {
        refresh();
    }, []);

    return (
        <>
            <SafeAreaProvider>
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
