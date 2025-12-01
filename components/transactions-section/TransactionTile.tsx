import { useState } from 'react';
import { StyleSheet, Pressable, useColorScheme } from 'react-native';
import { View } from '@/components/Themed';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { formatCurrency, formatDate } from '@/utils/utils';
import { ITransactionInfo } from '@/store/transactions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useTransactions from '@/hooks/useTransactions';
import colors from '@/constants/Colors';
import useAccounts from '@/hooks/useAccounts';
import { RootState, useAppSelector } from '@/store/store';

export interface ITransactionTileProps extends ITransactionInfo {
    color: string;
}

const pepperRedColor = '#f51720';

export const TransactionTile = ({
    id,
    amount,
    trxType,
    trxDate,
    paymentMethod,
    category,
    note,
    color,
}: ITransactionTileProps) => {
    const { remove } = useTransactions();
    const { updateBalance } = useAccounts();
    const [zIndex, setZIndex] = useState(-1);
    const colorScheme = useColorScheme() ?? 'light';
    const accounts = useAppSelector((state: RootState) => state.accounts.data);

    const handleLongPress = () => {
        setZIndex(1);
    };

    const handleDelete = async () => {
        const { balance } = accounts.find(
            (account) => account.value === paymentMethod,
        ) || { balance: 0 };
        await updateBalance(
            paymentMethod,
            trxType === 'true' ? balance - amount : balance + amount,
        );
        await remove(id);
    };

    const handleEdit = () => {
        router.push({
            pathname: '/transactionEntry',
            params: {
                id,
                amount,
                trxType,
                trxDate,
                paymentMethod,
                category,
                note,
            },
        });
        setZIndex(-1);
    };

    const handleCancel = () => {
        setZIndex(-1);
    };

    const tileBackground = {
        backgroundColor: colors[colorScheme].tileBackground,
        shadowColor: colors[colorScheme].text,
    };

    return (
        <Pressable onLongPress={handleLongPress}>
            <View
                style={[
                    tileBackground,
                    transactionTileStyles.container,
                    { borderRightColor: color },
                ]}
            >
                <View
                    style={[
                        tileBackground,
                        transactionTileStyles.innerContainer,
                    ]}
                >
                    <Text style={transactionTileStyles.note}>
                        {note} {category && `- ${category}`}
                    </Text>
                    <Text style={transactionTileStyles.amount}>
                        {formatCurrency(amount)}
                    </Text>
                </View>
                <View
                    style={[
                        tileBackground,
                        transactionTileStyles.innerContainer,
                    ]}
                >
                    <Text style={transactionTileStyles.dateTime}>
                        {formatDate(new Date(trxDate))}
                    </Text>
                </View>
                <View
                    style={[
                        tileBackground,
                        transactionTileStyles.actionsContainer,
                        { zIndex },
                    ]}
                >
                    <Pressable
                        onPress={handleDelete}
                        style={transactionTileStyles.deleteButton}
                    >
                        <MaterialCommunityIcons
                            name="trash-can"
                            size={28}
                            color={pepperRedColor}
                        />
                    </Pressable>
                    <Pressable
                        onPress={handleEdit}
                        style={transactionTileStyles.editButton}
                    >
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={28}
                            color={pepperRedColor}
                        />
                    </Pressable>
                    <Pressable
                        onPress={handleCancel}
                        style={transactionTileStyles.cancelButton}
                    >
                        <MaterialCommunityIcons
                            name="window-close"
                            size={28}
                            color={pepperRedColor}
                        />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const transactionTileStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        borderRightWidth: 2,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    note: {
        fontSize: 14,
        fontWeight: '800',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateTime: {
        fontSize: 12,
        fontWeight: '700',
        marginTop: 5,
    },
    actionsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    deleteButton: {},
    editButton: {},
    cancelButton: {},
});
