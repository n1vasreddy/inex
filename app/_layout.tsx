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

import { useColorScheme } from 'react-native';
import { tagsTableSchema, transactionsTableSchema } from '@/db/schema';

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
        (async () => {
            await setupDatabase(transactionsTableSchema);
            await setupDatabase(tagsTableSchema);
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
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Transaction Entry', // Set your modal title here
                        }}
                    />
                    <Stack.Screen
                        name="balances"
                        options={{
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Manage Balances', // Set your modal title here
                        }}
                    />
                    <Stack.Screen
                        name="accounts"
                        options={{
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Payment Methods', // Set your modal title here
                        }}
                    />
                    <Stack.Screen
                        name="tags"
                        options={{
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Manage Categories', // Set your modal title here
                        }}
                    />
                    <Stack.Screen
                        name="newTag"
                        options={{
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Add New Tag', // Set your modal title here
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
                    style={{
                        bottom: 86,
                        right: 16,
                        position: 'absolute',
                    }}
                />
            </ThemeProvider>
        </Provider>
    );
}
