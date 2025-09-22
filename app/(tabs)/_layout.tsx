import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import colors from '@/constants/colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6
                            name="chart-pie"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            {/* <Tabs.Screen
                name="two"
                options={{
                    title: 'Tab Two',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            /> */}
            <Tabs.Screen
                name="transactions"
                options={{
                    title: 'Transactions',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6
                            name="money-bill-transfer"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
