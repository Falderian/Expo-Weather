import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { ContentState } from "@/components/content-state";
import { DetailItem } from "@/components/detail-item";
import { IconButton } from "@/components/icon-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationCurrWeather } from "@/hooks/use-location-current-weather";
import { useTheme } from "@/hooks/use-theme";
import type { IconName } from "@/types";
import { WeatherCodes, WeatherIcons } from "@/utils";

const ROW_SIZE = 3;

const fmtTime = (d: Date) =>
	d.toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "2-digit",
	});

const relativeTime = (timestamp: number): string => {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "just now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
};

export const CurrentWeatherContent = () => {
	const theme = useTheme();
	const { currentLocation } = useCurrentLocation();
	const { data, isLoading, isError, refetch, isFetching, dataUpdatedAt } =
		useLocationCurrWeather(currentLocation);

	if (!currentLocation) {
		return (
			<ContentState
				type="empty"
				icon="map-marker-question"
				message="No location selected.\nTap the gear icon to pick one."
			/>
		);
	}

	if (isLoading) {
		return <ContentState type="loading" message="Loading weather..." />;
	}

	if (isError || !data) {
		return (
			<ContentState
				type="error"
				icon="alert-circle"
				message="Couldn't load weather data.\nPull down to retry."
			/>
		);
	}

	const c = data.current;
	const u = data.current_units;
	const weatherCode = c.weather_code;
	const condition = WeatherCodes[weatherCode] ?? "Unknown";
	const icon: IconName = (WeatherIcons[weatherCode] ??
		"weather-cloudy-alert") as IconName;

	const observedAt = new Date(c.time);
	const formattedDate = observedAt.toLocaleDateString(undefined, {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
	const formattedTime = observedAt.toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "2-digit",
	});

	const todaySunrise = data.daily?.sunrise?.[0];
	const todaySunset = data.daily?.sunset?.[0];

	const details: { icon: IconName; label: string; value: string }[] = [
		{
			icon: "weather-windy",
			label: "Wind",
			value: `${c.wind_speed_10m} ${u.wind_speed_10m}`,
		},
		{
			icon: "gauge",
			label: "Pressure",
			value: `${c.pressure_msl} ${u.pressure_msl}`,
		},
		{
			icon: "weather-cloudy",
			label: "Cloud cover",
			value: `${c.cloud_cover} ${u.cloud_cover}`,
		},
		{
			icon: "water-percent",
			label: "Humidity",
			value: `${c.relative_humidity_2m}${u.relative_humidity_2m}`,
		},
		{
			icon: "weather-rainy",
			label: "Dew point",
			value: `${c.dew_point_2m}${u.dew_point_2m}`,
		},
		{
			icon: "eye",
			label: "Visibility",
			value: `${(c.visibility / 1000).toFixed(1)} km`,
		},
		{
			icon: "weather-windy",
			label: "Gusts",
			value: `${c.wind_gusts_10m} ${u.wind_gusts_10m}`,
		},
	];

	if (todaySunrise) {
		details.push({
			icon: "weather-sunset-up",
			label: "Sunrise",
			value: fmtTime(new Date(todaySunrise)),
		});
	}

	if (todaySunset) {
		details.push({
			icon: "weather-sunset-down",
			label: "Sunset",
			value: fmtTime(new Date(todaySunset)),
		});
	}

	const rows: (typeof details)[] = [];
	for (let i = 0; i < details.length; i += ROW_SIZE) {
		rows.push(details.slice(i, i + ROW_SIZE));
	}

	return (
		<ThemedView style={styles.container}>
			<MaterialDesignIcons name={icon} size={96} color={theme.text} />

			<ThemedText type="title">
				{c.temperature_2m}
				{u.temperature_2m}
			</ThemedText>

			<ThemedText themeColor="textSecondary" style={styles.condition}>
				{condition}
			</ThemedText>

			<ThemedText themeColor="textSecondary" style={styles.date}>
				{formattedTime}, {formattedDate}
			</ThemedText>

			<ThemedText themeColor="textSecondary" style={styles.feelsLike}>
				Feels like {c.apparent_temperature}
				{u.temperature_2m}
			</ThemedText>

			<View style={styles.updatedRow}>
				<ThemedText themeColor="textSecondary" style={styles.updatedText}>
					Updated {relativeTime(dataUpdatedAt)}
				</ThemedText>
				<IconButton
					name="refresh"
					size={16}
					onPress={() => refetch()}
					disabled={isFetching}
				/>
			</View>

			<ThemedView style={styles.details} type="backgroundElement">
				{rows.map((row) => (
					<View style={styles.detailRow} key={row[0].label}>
						{row.map((item) => (
							<DetailItem
								key={item.label}
								icon={item.icon}
								label={item.label}
								value={item.value}
							/>
						))}
					</View>
				))}
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: Spacing.two,
		paddingVertical: Spacing.four,
	},
	condition: {
		fontSize: 18,
		marginBottom: Spacing.two,
	},
	date: {
		fontSize: 14,
		marginBottom: Spacing.half,
	},
	feelsLike: {
		fontSize: 15,
		marginBottom: Spacing.one,
	},
	updatedRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.two,
		paddingHorizontal: Spacing.four,
		width: "100%",
	},
	updatedText: {
		flex: 1,
		fontSize: 12,
	},
	details: {
		flexDirection: "column",
		gap: Spacing.three,
		paddingHorizontal: Spacing.four,
		paddingVertical: Spacing.three,
		borderRadius: Spacing.three,
		width: "100%",
	},
	detailRow: {
		flexDirection: "row",
		gap: Spacing.three,
	},
});
