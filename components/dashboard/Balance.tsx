import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { IAccountInfo } from '@/store/accounts';
import { formatCurrency } from '@/utils/utils';
import { RootState, useAppSelector } from '@/store/store';
import colors from '@/constants/Colors';

const Balance = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const accounts: IAccountInfo[] = useAppSelector(
        (state: RootState) => state.accounts.data,
    );

    const netBalance = accounts.reduce(
        (acc, curr) =>
            curr.type === 'standard'
                ? acc + curr.balance
                : curr.type === 'credit'
                ? acc + curr.balance
                : acc,
        0,
    );

    const balance = accounts.reduce(
        (acc, curr) => (curr.type === 'standard' ? acc + curr.balance : acc),
        0,
    );

    const investments = accounts.reduce(
        (acc, curr) => (curr.type === 'brokerage' ? acc + curr.balance : acc),
        0,
    );

    const balanceTileStyle = {
        backgroundColor: colors[colorScheme].balanceTileColor,
        shadowColor: colors[colorScheme].text,
    };

    return (
        <View style={balanceStyles.container}>
            <View
                style={[
                    balanceStyles.balanceContainer,
                    balanceStyles.balanceTile,
                    balanceTileStyle,
                ]}
            >
                <Text variant="titleMedium" style={balanceStyles.label}>
                    Net Balance
                </Text>
                <Text variant="titleLarge" style={balanceStyles.balance}>
                    {formatCurrency(netBalance)}
                </Text>
            </View>
            <View
                style={[
                    balanceStyles.balanceContainer,
                    balanceStyles.balanceTile,
                    balanceTileStyle,
                ]}
            >
                <Text variant="titleMedium" style={balanceStyles.label}>
                    Balance
                </Text>
                <Text variant="titleLarge" style={balanceStyles.balance}>
                    {formatCurrency(balance)}
                </Text>
            </View>
            <View
                style={[
                    balanceStyles.balanceContainer,
                    balanceStyles.balanceTile,
                    balanceTileStyle,
                ]}
            >
                <Text variant="titleMedium" style={balanceStyles.label}>
                    Investments
                </Text>
                <Text variant="titleLarge" style={balanceStyles.balance}>
                    {formatCurrency(investments)}
                </Text>
            </View>
        </View>
    );
};

export default Balance;

const balanceStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 16,
        gap: 12,
    },
    balanceContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        gap: 4,
    },
    balanceTile: {
        borderRadius: 8,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    label: {
        // fontSize: 16,
        // fontWeight: 'bold',
    },
    balance: {
        // fontSize: 16,
        // textAlign: 'right',
    },
});
