import { FlatList, StyleSheet } from "react-native";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationForecast } from "@/hooks/use-location-forecast";
import { ForecastState } from "./forecast-state";
import { ForecastWeekly } from "./forecast-weekly";
import { HourlyColumn } from "./hourly-weather-column";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export const ForecastWeather = () => {
	const { currentLocation } = useCurrentLocation();
	const { hourlyData, currentHourIndex, isLoading, isError, refetch } =
		useLocationForecast(currentLocation);

	if (isLoading) {
		return <ForecastState state="loading" />;
	}

	if (isError || !hourlyData.length) {
		return <ForecastState state="error" onRetry={() => refetch?.()} />;
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedView>
				<ThemedText style={styles.title} themeColor="textSecondary">
					Hourly Forecast
				</ThemedText>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={hourlyData}
					keyExtractor={(item) => item.time.toISOString()}
					renderItem={({ item, index }) => (
						<HourlyColumn item={item} isCurrent={index === currentHourIndex} />
					)}
					contentContainerStyle={styles.listContent}
					snapToInterval={88}
					decelerationRate="fast"
					getItemLayout={(_, index) => ({
						length: 80,
						offset: 88 * index,
						index,
					})}
					initialScrollIndex={currentHourIndex >= 0 ? currentHourIndex : 0}
				/>
			</ThemedView>
			<ForecastWeekly />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		marginHorizontal: 16,
		marginBottom: 12,
	},
	listContent: {
		paddingHorizontal: 12,
		gap: 8,
	},
});
