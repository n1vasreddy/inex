import { Text, View } from '@/components/Themed';
import { transactionTileStyles } from '@/constants/styles';
import { formatCurrency, formatDate } from '@/utils/utils';

export type ITransactionTileProps = {
    amount: number;
    trxType?: string;
    date: string;
    source?: string;
    category?: string[];
    note: string;
};

export const TransactionTile = ({
    amount,
    date,
    note,
}: ITransactionTileProps) => (
    <View style={transactionTileStyles.container}>
        <View style={transactionTileStyles.innerContainer}>
            <Text style={transactionTileStyles.note}>{note}</Text>
            <Text style={transactionTileStyles.amount}>
                {formatCurrency(amount)}
            </Text>
        </View>
        <View style={transactionTileStyles.innerContainer}>
            <Text style={transactionTileStyles.dateTime}>
                {formatDate(new Date(date))}
            </Text>
        </View>
    </View>
);
