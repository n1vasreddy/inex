import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
const {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} = require('@react-navigation/native');
import { AnimatedFAB } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { setupDatabase } from '@/db/database';
import { Appearance, useColorScheme } from 'react-native';
import {
    accountsTableSchema,
    tagsTableSchema,
    transactionsTableSchema,
} from '@/db/schema';
import colors from '@/constants/Colors';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        Appearance.setColorScheme('light');
        (async () => {
            await setupDatabase(transactionsTableSchema);
            await setupDatabase(tagsTableSchema);
            await setupDatabase(accountsTableSchema);
        })();
    }, []);

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <Provider store={store}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="transactionEntry"
                        options={{
                            presentation: 'modal',
                            title: 'Transaction Entry',
                        }}
                    />
                    <Stack.Screen
                        name="accounts"
                        options={{
                            presentation: 'modal',
                            title: 'Accounts',
                        }}
                    />
                    <Stack.Screen
                        name="addAccount"
                        options={{
                            presentation: 'modal',
                            title: 'Add Account',
                        }}
                    />
                    <Stack.Screen
                        name="tags"
                        options={{
                            presentation: 'modal',
                            title: 'Manage Categories',
                        }}
                    />
                    <Stack.Screen
                        name="newTag"
                        options={{
                            presentation: 'modal',
                            title: 'Add New Tag',
                        }}
                    />
                </Stack>
                <AnimatedFAB
                    icon={'plus'}
                    label={'Label'}
                    extended={false}
                    onPress={() => router.navigate('/transactionEntry')}
                    visible={true}
                    animateFrom={'right'}
                    iconMode={'static'}
                    color={colors.babyBlue}
                    style={{
                        bottom: 86,
                        right: 16,
                        position: 'absolute',
                        backgroundColor: colors.fuchsia,
                    }}
                />
            </ThemeProvider>
        </Provider>
    );
}
