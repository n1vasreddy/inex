import { FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { View } from '@/components/Themed';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { TransactionTile, ITransactionTileProps } from './TransactionTile';
import { transactionTilesMockData } from '@/constants/mockData';
import { transactionSectionStyles } from '@/constants/styles';

export default function TransactionsSection() {
    const colorScheme = useColorScheme();

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={transactionSectionStyles.container}>
                    <FlatList
                        data={transactionTilesMockData}
                        renderItem={(props: {
                            item: ITransactionTileProps;
                        }) => <TransactionTile {...props.item} />}
                        keyExtractor={(item: any) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>

            <View style={transactionSectionStyles.container}>
                <Link href="/addTransaction" asChild>
                    <Pressable>
                        {({ pressed = false }: { pressed?: boolean }) => (
                            <Ionicons
                                name="add-circle"
                                size={45}
                                color={colors[colorScheme ?? 'light'].text}
                                style={{
                                    marginRight: 15,
                                    opacity: pressed ? 0.5 : 1,
                                }}
                            />
                        )}
                    </Pressable>
                </Link>
            </View>
        </>
    );
}
