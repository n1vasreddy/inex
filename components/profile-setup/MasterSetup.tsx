import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { StyleSheet } from 'react-native';

const MasterSetup = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={masterSetupStyles.containerStyle}>
                <Link href={'/balances'} style={masterSetupStyles.linkStyle}>
                    <Text variant="titleMedium">Manage Balances</Text>
                </Link>
                <Link href={'/accounts'} style={masterSetupStyles.linkStyle}>
                    <Text variant="titleMedium">Payment Methods</Text>
                </Link>
                <Link href={'/tags'} style={masterSetupStyles.linkStyle}>
                    <Text variant="titleMedium">Manage Categories</Text>
                </Link>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default MasterSetup;

const masterSetupStyles = StyleSheet.create({
    containerStyle: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },
    linkStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        width: 200,
    },
});
