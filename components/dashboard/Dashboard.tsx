import colors from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

const Dashboard = () => {
    const colorScheme = useColorScheme();

    return (
        <View
            style={[
                {
                    backgroundColor: colors[colorScheme ?? 'light'].background,
                },
                styles.container,
            ]}
        ></View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: { flex: 1 },
});
