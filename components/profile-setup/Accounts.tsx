import React from 'react';
import { View, StyleSheet, useColorScheme, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '@/constants/Colors';
import { AccountTile } from './AccountTile';
import { useRouter } from 'expo-router';
import { labels } from '@/constants/constants';

export interface IAccountInfo {
    label: string;
    value: string;
    type: string;
    balance: number;
}

const Accounts = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const data = [
        {
            label: 'HDFC Debit Card',
            value: 'hdfc-main-account',
            type: 'standard',
            balance: 899000,
        },
    ];

    const handleAdd = () => {
        router.navigate('./addAccount');
    };

    return (
        <View
            style={[
                {
                    backgroundColor: colors[colorScheme ?? 'light'].background,
                },
                styles.container,
            ]}
        >
            <Button
                mode="contained"
                onPress={handleAdd}
                style={styles.addButton}
            >
                {labels.addAccount}
            </Button>
            <FlatList
                data={data}
                renderItem={(props: { item: IAccountInfo }) => (
                    <AccountTile {...props.item} />
                )}
                keyExtractor={(item: IAccountInfo) => item.value}
            />
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        marginBottom: 24,
        backgroundColor: colors.fuchsia,
        color: colors.babyBlue,
    },
});
