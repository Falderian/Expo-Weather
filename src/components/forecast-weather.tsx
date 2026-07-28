import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationForecast } from "@/hooks/use-location-forecast";
import { fmtTime, WeatherIcons } from "@/utils";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const PRECIP_WARNING_THRESHOLD = 30;
const TEMP_COLD = 10;
const TEMP_HOT = 25;

const getTempColor = (temp: number) => {
	if (temp <= TEMP_COLD) return "#3b82f6";
	if (temp >= TEMP_HOT) return "#ef4444";
	return "#8b5cf6";
};

export const ForecastWeather = () => {
	const { currentLocation } = useCurrentLocation();
	const { data, isLoading, isError, refetch } =
		useLocationForecast(currentLocation);

	const hourlyData = useMemo(() => {
		if (!data?.hourly) return [];
		return data.hourly.time.map((time, index) => ({
			time: new Date(time),
			temperature: data.hourly.temperature_2m[index],
			apparentTemperature: data.hourly.apparent_temperature[index],
			precipitationProbability: data.hourly.precipitation_probability[index],
			precipitation: data.hourly.precipitation[index],
			weatherCode: data.hourly.weather_code[index],
			windSpeed: data.hourly.wind_speed_10m[index],
		}));
	}, [data]);

	const currentHourIndex = useMemo(() => {
		const now = new Date();
		return hourlyData.findIndex(
			(item) => item.time.getHours() === now.getHours(),
		);
	}, [hourlyData]);

	if (isLoading) {
		return (
			<ThemedView style={styles.center}>
				<ThemedText>Loading forecast…</ThemedText>
			</ThemedView>
		);
	}

	if (isError || !data?.hourly) {
		return (
			<ThemedView style={styles.center}>
				<ThemedText
					themeColor="textSecondary"
					style={{ textAlign: "center", marginBottom: 12 }}
				>
					Failed to load forecast
				</ThemedText>
				<TouchableOpacity
					onPress={() => refetch?.()}
					style={styles.retryButton}
				>
					<ThemedText style={styles.retryText}>Retry</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title} themeColor="textSecondary">
				Hourly Forecast
			</ThemedText>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={hourlyData}
				keyExtractor={(_, index) => index.toString()}
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
	);
};

type HourlyItem = {
	time: Date;
	temperature: number;
	apparentTemperature: number;
	precipitationProbability: number;
	precipitation: number;
	weatherCode: number;
	windSpeed: number;
};

const HourlyColumn = ({
	item,
	isCurrent,
}: {
	item: HourlyItem;
	isCurrent: boolean;
}) => {
	const iconName = WeatherIcons[item.weatherCode] ?? "weather-cloudy";
	const isWarning = item.precipitationProbability >= PRECIP_WARNING_THRESHOLD;
	const tempColor = getTempColor(item.temperature);

	return (
		<ThemedView
			style={[
				styles.column,
				isCurrent && styles.columnCurrent,
				isWarning && styles.columnWarning,
			]}
		>
			<View style={styles.timeContainer}>
				<ThemedText style={styles.time} themeColor="textSecondary">
					{isCurrent ? "NOW" : fmtTime(item.time)}
				</ThemedText>
			</View>

			<MaterialDesignIcons name={iconName} size={32} color="currentColor" />

			<ThemedText style={[styles.tempText, { color: tempColor }]}>
				{Math.round(item.temperature)}°
			</ThemedText>

			<ThemedText style={styles.feelsLike} themeColor="textSecondary">
				{Math.round(item.apparentTemperature)}°
			</ThemedText>

			<View style={styles.footer}>
				<View style={styles.footerItem}>
					<MaterialDesignIcons
						name="water"
						size={12}
						color={isWarning ? "#06b6d4" : "currentColor"}
					/>
					<ThemedText
						style={[styles.footerText, isWarning && styles.warningText]}
					>
						{Math.round(item.precipitationProbability)}%
					</ThemedText>
				</View>
				<View style={styles.footerItem}>
					<MaterialDesignIcons name="weather-windy" color="currentColor" />
					<ThemedText style={styles.footerText}>
						{Math.round(item.windSpeed)}
					</ThemedText>
				</View>
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
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
	column: {
		width: 80,
		alignItems: "center",
		borderWidth: 2,
		borderRadius: 8,
		borderColor: "rgba(139, 92, 246, 0.15)",
	},
	columnCurrent: {
		backgroundColor: "rgba(139, 92, 246, 0.15)",
		borderColor: "rgba(139, 92, 246, 0.4)",
	},
	columnWarning: {
		backgroundColor: "rgba(6, 182, 212, 0.12)",
		borderColor: "rgba(6, 182, 212, 0.35)",
	},
	timeContainer: {
		minHeight: 16,
		justifyContent: "center",
	},
	time: {
		fontSize: 11,
		fontWeight: "500",
		opacity: 0.8,
	},
	tempText: {
		fontSize: 20,
		fontWeight: "700",
		marginTop: 2,
	},
	feelsLike: {
		fontSize: 11,
	},
	footer: {
		width: "100%",
		borderTopWidth: 1,
		borderTopColor: "rgba(139, 92, 246, 0.15)",
	},
	footerItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	footerText: {
		fontSize: 10,
	},
	warningText: {
		color: "#06b6d4",
		fontWeight: "600",
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	retryButton: {
		backgroundColor: "rgba(139, 92, 246, 0.15)",
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(139, 92, 246, 0.3)",
	},
	retryText: {
		fontSize: 14,
		fontWeight: "600",
	},
});
