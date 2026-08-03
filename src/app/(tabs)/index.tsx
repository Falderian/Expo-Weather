import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useMemo } from "react";
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
import { fmtTime, relativeTime, WeatherCodes, WeatherIcons } from "@/utils";

const ROW_SIZE = 3;
const VISIBILITY_METERS_TO_KM = 1000;
const UNKNOWN_WEATHER_ICON: IconName = "weather-cloudy-alert";

const CurrentWeatherTab = () => {
	const theme = useTheme();
	const { currentLocation } = useCurrentLocation();
	const { data, isLoading, isError, refetch, isFetching, dataUpdatedAt } =
		useLocationCurrWeather(currentLocation);

	const weatherCode = data?.current?.weather_code;
	const condition =
		weatherCode != null ? (WeatherCodes[weatherCode] ?? "Unknown") : "Unknown";
	const icon: IconName =
		weatherCode != null
			? (WeatherIcons[weatherCode] ?? UNKNOWN_WEATHER_ICON)
			: UNKNOWN_WEATHER_ICON;

	const observedAt = data?.current?.time ? new Date(data.current.time) : null;
	const formattedDate = useMemo(() => {
		if (!observedAt) return "";
		return observedAt.toLocaleDateString(undefined, {
			weekday: "long",
			day: "numeric",
			month: "long",
		});
	}, [observedAt]);

	const formattedTime = useMemo(() => {
		if (!observedAt) return "";
		return observedAt.toLocaleTimeString(undefined, {
			hour: "numeric",
			minute: "2-digit",
		});
	}, [observedAt]);

	const todaySunrise = data?.daily?.sunrise?.[0];
	const todaySunset = data?.daily?.sunset?.[0];

	const details = useMemo(() => {
		if (!data) return [];
		const current = data.current;
		const units = data.current_units;
		const items: { icon: IconName; label: string; value: string }[] = [];

		items.push({
			icon: "weather-windy",
			label: "Wind",
			value: `${current.wind_speed_10m} ${units.wind_speed_10m}`,
		});
		items.push({
			icon: "gauge",
			label: "Pressure",
			value: `${current.pressure_msl} ${units.pressure_msl}`,
		});
		items.push({
			icon: "weather-cloudy",
			label: "Cloud cover",
			value: `${current.cloud_cover} ${units.cloud_cover}`,
		});
		items.push({
			icon: "water-percent",
			label: "Humidity",
			value: `${current.relative_humidity_2m}${units.relative_humidity_2m}`,
		});

		if (current.dew_point_2m != null) {
			items.push({
				icon: "weather-rainy",
				label: "Dew point",
				value: `${current.dew_point_2m}${units.dew_point_2m}`,
			});
		}

		if (current.visibility != null) {
			const visibilityKm = (
				current.visibility / VISIBILITY_METERS_TO_KM
			).toFixed(1);
			items.push({
				icon: "eye",
				label: "Visibility",
				value: `${visibilityKm} km`,
			});
		}

		if (current.wind_gusts_10m != null) {
			items.push({
				icon: "weather-windy",
				label: "Gusts",
				value: `${current.wind_gusts_10m} ${units.wind_gusts_10m}`,
			});
		}

		if (todaySunrise) {
			items.push({
				icon: "weather-sunset-up",
				label: "Sunrise",
				value: fmtTime(new Date(todaySunrise)),
			});
		}

		if (todaySunset) {
			items.push({
				icon: "weather-sunset-down",
				label: "Sunset",
				value: fmtTime(new Date(todaySunset)),
			});
		}

		return items;
	}, [data, todaySunrise, todaySunset]);

	const rows = useMemo(() => {
		const rowArray = [];
		for (let i = 0; i < details.length; i += ROW_SIZE) {
			rowArray.push(details.slice(i, i + ROW_SIZE));
		}
		return rowArray;
	}, [details]);

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

	const current = data.current;
	const units = data.current_units;

	return (
		<ThemedView style={styles.container}>
			<MaterialDesignIcons name={icon} size={96} color={theme.text} />
			<ThemedText type="title">
				{current.temperature_2m}
				{units.temperature_2m}
			</ThemedText>
			<ThemedText themeColor="textSecondary" style={styles.condition}>
				{condition}
			</ThemedText>
			<ThemedText themeColor="textSecondary" style={styles.date}>
				{formattedTime}, {formattedDate}
			</ThemedText>
			<ThemedText themeColor="textSecondary" style={styles.feelsLike}>
				Feels like {current.apparent_temperature}
				{units.temperature_2m}
			</ThemedText>
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

export default CurrentWeatherTab;
