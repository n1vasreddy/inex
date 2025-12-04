import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme } from 'react-native';
import colors from '@/constants/Colors';
import ExpenseTrend from '@/components/dashboard/ExpenseTrend';
import Balance from './Balance';

const Dashboard = () => {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <ScrollView>
            <View
                style={[
                    {
                        backgroundColor:
                            colors[colorScheme ?? 'light'].background,
                    },
                    styles.container,
                ]}
            >
                <Balance />
                <ExpenseTrend />
            </View>
        </ScrollView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 'auto',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 80,
        gap: 20,
    },
});
