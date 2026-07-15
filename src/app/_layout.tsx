import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export const unstable_settings = {
	initialRouteName: "index",
};

export default function RootLayout() {
	const colorScheme = "dark";

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<ThemedView style={styles.container}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="location" options={{ headerShown: false }} />
					</Stack>
				</ThemedView>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
