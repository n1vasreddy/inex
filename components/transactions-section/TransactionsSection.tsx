import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { transactionSectionStyles } from '@/constants/styles';
import { useSelector } from 'react-redux';

export default function TransactionsSection() {
    const transactions = useSelector((state: any) => state.transactions.data);

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={transactionSectionStyles.container}>
                    <FlatList
                        data={transactions}
                        renderItem={(props: {
                            item: ITransactionTileProps;
                        }) => <TransactionTile {...props.item} />}
                        keyExtractor={(item: any) => item.amount}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}
