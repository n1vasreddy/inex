import React, { use, useEffect, useMemo } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useAppSelector, RootState } from '@/store/store';
import { ITransactionInfo } from '@/store/transactions';
import colors from '@/constants/Colors';
import useTransactions from '@/hooks/useTransactions';

const ExpenseTrend = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const transactions: ITransactionInfo[] = useAppSelector(
        (state: RootState) => state.transactions.data,
    );
    const { refresh } = useTransactions();

    useEffect(() => {
        if (!transactions.length) refresh();
    }, []);

    const months: string[] = useMemo(() => {
        const months = [];
        const currentDate = new Date();
        const startDate = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth() + 2,
            0,
        );

        for (let i = 1; i <= 12; i++) {
            const targetMonth = new Date(
                startDate.getFullYear(),
                startDate.getMonth() + i,
                0,
            );
            const targetMonthString = `${targetMonth.toLocaleString('default', {
                month: 'short',
            })} ${targetMonth.getFullYear()}`;
            months.push(targetMonthString);
        }

        return months;
    }, []);

    const monthsData: number[] = useMemo(() => {
        const debitTransactionsForMonths = months.map((monthString) => {
            const [targetMonth, targetYear] = monthString.split(' ');
            const debitTransactionsForMonth = transactions
                .filter((transaction) => {
                    const transactionDate = new Date(transaction.trxDate);
                    return (
                        transaction.trxType === 'false' &&
                        transactionDate.getFullYear() === Number(targetYear) &&
                        transactionDate.toLocaleString('default', {
                            month: 'short',
                        }) === targetMonth
                    );
                })
                .reduce((sum, transaction) => sum + transaction.amount, 0);
            return debitTransactionsForMonth;
        });
        return debitTransactionsForMonths;
    }, [months, transactions]);

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={{ alignSelf: 'center' }}>
                YTD Expenses
            </Text>
            <LineChart
                data={{
                    labels: months.map((month: string) => month.split(' ')[0]),
                    datasets: [
                        {
                            data: monthsData,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 20}
                height={350}
                yAxisLabel="₹"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: colors[colorScheme].text,
                    backgroundGradientFrom:
                        colors[colorScheme].graphBackgroundGradientFrom,
                    backgroundGradientTo:
                        colors[colorScheme].graphBackgroundGradientTo,
                    decimalPlaces: 2,
                    color: (opacity = 0.25) =>
                        `rgba(255, 255, 255, ${opacity})`,
                    labelColor: () => colors.light.text,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '2',
                        strokeWidth: '1',
                        stroke: colors[colorScheme].selectedChip,
                    },
                }}
                bezier
                segments={10}
                style={{
                    marginVertical: 12,
                    borderRadius: 6,
                }}
            />
        </View>
    );
};

export default ExpenseTrend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
