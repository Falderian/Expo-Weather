import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Spacing } from "@/constants/theme";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationWeeklyForecast } from "@/hooks/use-location-weekly-forecast";
import { WeeklyRow } from "./forecast/WeeklyRow";
import { StateResponse } from "./state-response";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export const ForecastWeekly = () => {
	const { currentLocation } = useCurrentLocation();
	const { dailyData, isLoading, isError, refetch } =
		useLocationWeeklyForecast(currentLocation);

	const todayStr = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

	if (isLoading) return <StateResponse state="loading" />;
	if (isError || !dailyData.length)
		return <StateResponse state="error" onRetry={() => refetch?.()} />;

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title} themeColor="textSecondary">
				Weekly Forecast
			</ThemedText>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{dailyData.map((item) => (
					<WeeklyRow
						key={item.time}
						item={item}
						isToday={item.time === todayStr}
					/>
				))}
			</ScrollView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		marginHorizontal: Spacing.three,
		marginBottom: Spacing.three,
	},
	scrollContent: {
		gap: Spacing.two,
		paddingHorizontal: Spacing.three,
		paddingBottom: Spacing.three,
	},
});
