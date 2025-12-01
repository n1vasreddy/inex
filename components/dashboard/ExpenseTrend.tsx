import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import ChipSelectionInput from '@/components/chip-input/ChipSelectionInput';
import { useAppSelector, RootState } from '@/store/store';
import { ITransactionInfo } from '@/store/transactions';
import colors from '@/constants/Colors';
import useTransactions from '@/hooks/useTransactions';
import useTags from '@/hooks/useTags';

const ExpenseTrend = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const transactions: ITransactionInfo[] = useAppSelector(
        (state: RootState) => state.transactions.data,
    );
    const tagsData = useAppSelector((state: RootState) => state.tags.data);
    const { refresh } = useTransactions();
    const { refreshTags } = useTags();
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (!transactions.length) refresh();
        if (!tagsData.length) refreshTags();
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

    let isMonthsDataGTk = false;

    const isCategorySelected = (category: string) => {
        if (tags.length > 0) {
            return tags.includes(category);
        } else {
            return true;
        }
    };

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
                        }) === targetMonth &&
                        isCategorySelected(transaction.category)
                    );
                })
                .reduce((sum, transaction) => sum + transaction.amount, 0);
            return debitTransactionsForMonth;
        });
        if (Math.max(...debitTransactionsForMonths) > 1000) {
            isMonthsDataGTk = true;
            return debitTransactionsForMonths.map((value) => value / 1000);
        } else {
            isMonthsDataGTk = false;
            return debitTransactionsForMonths;
        }
    }, [months, transactions, tags]);

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={{ alignSelf: 'center' }}>
                YTD Expenses
            </Text>

            <ChipSelectionInput
                data={tagsData}
                value={tags}
                onChange={setTags}
                style={styles.tagsContainer}
                chipsContainerStyles={styles.chipsContainerStyles}
            />
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
                yAxisSuffix={isMonthsDataGTk ? 'k' : ''}
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
                    propsForLabels: {
                        fontWeight: 'bold',
                    },
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '2',
                        strokeWidth: '2',
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
    tagsContainer: {
        padding: 10,
    },
    chipsContainerStyles: {
        justifyContent: 'space-around',
    },
});
