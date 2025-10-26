import { useState } from 'react';
import { StyleSheet, Pressable, useColorScheme } from 'react-native';
import { View } from '@/components/Themed';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { formatCurrency } from '@/utils/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import { IAccountInfo } from './Accounts';

export interface IAccountTileProps extends IAccountInfo {}

const pepperRedColor = '#f51720';

export const AccountTile = ({
    label,
    value,
    type,
    balance,
}: IAccountTileProps) => {
    const colorScheme = useColorScheme();
    const [zIndex, setZIndex] = useState(-1);

    const handleLongPress = () => {
        setZIndex(1);
    };

    const handleDelete = async () => {};

    const handleEdit = () => {
        router.push({
            pathname: '/addAccount',
            params: {
                label,
                value,
                type,
                balance,
            },
        });
        setZIndex(-1);
    };

    const handleCancel = () => {
        setZIndex(-1);
    };

    const tileBackground = {
        backgroundColor: colors[colorScheme ?? 'light'].tileBackground,
    };

    return (
        <Pressable onLongPress={handleLongPress}>
            <View style={[tileBackground, accountTileStyles.container]}>
                <Text
                    style={accountTileStyles.label}
                >{`${label} (${type})`}</Text>
                <Text style={accountTileStyles.balance}>
                    {formatCurrency(balance)}
                </Text>
                <View
                    style={[
                        tileBackground,
                        accountTileStyles.actionsContainer,
                        { zIndex },
                    ]}
                >
                    <Pressable
                        onPress={handleDelete}
                        style={accountTileStyles.deleteButton}
                    >
                        <MaterialCommunityIcons
                            name="trash-can"
                            size={28}
                            color={pepperRedColor}
                        />
                    </Pressable>
                    <Pressable
                        onPress={handleEdit}
                        style={accountTileStyles.editButton}
                    >
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={28}
                            color={pepperRedColor}
                        />
                    </Pressable>
                    <Pressable
                        onPress={handleCancel}
                        style={accountTileStyles.cancelButton}
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

const accountTileStyles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '800',
    },
    balance: {
        fontSize: 16,
        fontWeight: 'bold',
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
