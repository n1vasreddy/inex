import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { transactionSectionStyles } from '@/constants/styles';
import { loadTransactions } from '@/store/transactions';
import {
    AppDispatch,
    RootState,
    useAppDispatch,
    useAppSelector,
} from '@/store/store';
import { options } from '@/constants/constants';

export default function TransactionsSection() {
    const dispatch: AppDispatch = useAppDispatch();
    const transactions = useAppSelector(
        (state: RootState) => state.transactions.data,
    );

    useEffect(() => {
        dispatch(loadTransactions());
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
