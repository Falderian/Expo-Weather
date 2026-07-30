import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { ThemedView } from "@/components/themed-view";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export const unstable_settings = {
	initialRouteName: "index",
};

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<ScreenContainer>
				<ThemedView style={styles.container}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="location" options={{ headerShown: false }} />
					</Stack>
				</ThemedView>
			</ScreenContainer>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});
