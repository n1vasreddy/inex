import { StyleSheet, FlatList, StatusBar, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { CustomButton } from '@/components/CustomButton';
// import { colors } from '@/constants/CommonColors';
import { transactionTileStyles } from '@/constants/styles';
import { formatCurrency, formatDate } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TransactionsScreen() {
    const colorScheme = useColorScheme();

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item {...item} />}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            </SafeAreaProvider>

            <View style={styles.container}>
                {/* <CustomButton
                    title="Add Transaction"
                    onPress={() => {}}
                    color={colors.redOrange}
                /> */}
                <Link href="/addTransaction" asChild>
                    <Pressable>
                        {({ pressed = false }: { pressed?: boolean }) => (
                            <Ionicons
                                name="add-circle"
                                size={45}
                                color={Colors[colorScheme ?? 'light'].text}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
    },
    container1: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#93DA97',
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 18,
    },
});

// Mock data - to be removed later
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        amount: 100,
        trxType: 'Debit',
        date: new Date(),
        source: 'HDFC Bank',
        category: ['Food', 'Grocery'],
        note: 'Some note',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        amount: 20,
        trxType: 'Debit',
        date: new Date(),
        source: 'HDFC Bank',
        category: ['Food', 'Grocery'],
        note: 'Some note',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        amount: 5500,
        trxType: 'Debit',
        date: new Date(),
        source: 'HDFC Bank',
        category: ['Food', 'Grocery'],
        note: 'Some note',
    },
];

type ItemProps = {
    amount: number;
    trxType?: string;
    date: Date;
    source?: string;
    category?: string[];
    note: string;
};

const Item = ({ amount, date, note }: ItemProps) => (
    <View style={transactionTileStyles.container}>
        <View style={transactionTileStyles.innerContainer}>
            <Text style={styles.note}>{note}</Text>
            <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>
        <View style={transactionTileStyles.innerContainer}>
            <Text style={styles.dateTime}>{formatDate(date)}</Text>
        </View>
    </View>
);
