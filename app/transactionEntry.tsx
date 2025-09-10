import TransactionEntry from '@/components/transactions-section/TransactionEntry';
import { ITransactionInfo } from '@/store/transactions';
import { useLocalSearchParams } from 'expo-router';

export default function AddTransactionScreen() {
    const params = useLocalSearchParams<ITransactionInfo>();

    return <TransactionEntry {...params} />;
}
