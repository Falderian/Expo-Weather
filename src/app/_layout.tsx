import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ScreenContainer } from "@/components/ScreenContainer";

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
		<ScreenContainer>
			<QueryClientProvider client={queryClient}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</QueryClientProvider>
		</ScreenContainer>
	);
}
