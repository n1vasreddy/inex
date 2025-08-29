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

import { useColorScheme } from '@/components/useColorScheme';

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
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

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
                        name="modal"
                        options={{ presentation: 'modal' }}
                    />
                    <Stack.Screen
                        name="transactionEntry"
                        options={{
                            presentation: 'modal', // This makes it appear as a modal
                            title: 'Transaction Entry', // Set your modal title here
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
