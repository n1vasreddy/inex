import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { StyledText as Text } from '@/components/styled-text/StyledText';
import { Appearance, StyleSheet, useColorScheme } from 'react-native';
import colors from '@/constants/Colors';
import { labels } from '@/constants/constants';
import ToggleInput from '@/components/toggle-input/ToggleInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MasterSetup = () => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = React.useState<boolean>(
        Appearance.getColorScheme() === 'light',
    );

    useEffect(() => {
        if (theme) {
            Appearance.setColorScheme('light');
        } else {
            Appearance.setColorScheme('dark');
        }
    }, [theme]);

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[
                    {
                        backgroundColor:
                            colors[colorScheme ?? 'light'].background,
                    },
                    masterSetupStyles.containerStyle,
                ]}
            >
                <Link href={'/accounts'} style={masterSetupStyles.linkStyle}>
                    <Text
                        variant="titleMedium"
                        style={masterSetupStyles.buttonColor}
                    >
                        {labels.accounts}
                    </Text>
                </Link>
                <Link href={'/tags'} style={masterSetupStyles.linkStyle}>
                    <Text
                        variant="titleMedium"
                        style={masterSetupStyles.buttonColor}
                    >
                        {labels.tags}
                    </Text>
                </Link>
                <ToggleInput
                    label={theme ? 'Light' : 'Dark'}
                    onValueChange={async (theme: boolean) => {
                        setTheme(theme);
                        await AsyncStorage.setItem('theme', theme.toString());
                    }}
                    value={colorScheme === 'light'}
                    style={{ margin: 8 }}
                />
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
    buttonColor: {
        color: colors.babyBlue,
    },
    linkStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.fuchsia,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        width: 200,
        backgroundColor: colors.fuchsia,
    },
});
