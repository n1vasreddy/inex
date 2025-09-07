import { Text, View } from '@/components/Themed';
import { transactionTileStyles } from '@/constants/styles';
import { formatCurrency, formatDate } from '@/utils/utils';
import { ITransactionInfo } from '@/store/transactions';

export interface ITransactionTileProps extends ITransactionInfo {
    color: string;
}

export const TransactionTile = ({
    amount,
    date,
    note,
    color,
}: ITransactionTileProps) => (
    <View
        style={[transactionTileStyles.container, { borderRightColor: color }]}
    >
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
