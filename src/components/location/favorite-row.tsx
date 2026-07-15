import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationCurrWeather } from "@/hooks/use-location-current-weather";
import { useTheme } from "@/hooks/use-theme";
import type { TLocation } from "@/types";
import { WeatherCodes, WeatherIcons } from "@/utils";
import { IconButton } from "../icon-button";

type Props = {
	location: TLocation;
	removeFavorite: () => void;
};

type IconName = ComponentProps<typeof MaterialDesignIcons>["name"];

export const FavoriteRow = ({ location, removeFavorite }: Props) => {
	const theme = useTheme();
	const { setCurrentLocation, currentLocation } = useCurrentLocation();
	const { data, isLoading, isError } = useLocationCurrWeather(location);

	const weatherCode = data?.current.weather_code;
	const temperature = data?.current.temperature_2m;
	const condition =
		weatherCode !== undefined ? WeatherCodes[weatherCode] : undefined;
	const icon =
		weatherCode !== undefined ? WeatherIcons[weatherCode] : undefined;

	const isCurrentLocation = location.id === currentLocation?.id;

	if (isLoading || isError) {
		return (
			<View style={styles.container}>
				<View style={styles.info}>
					<Text style={[styles.title, { color: theme.text }]}>
						{location.name}
					</Text>
					<Text style={[styles.temp, { color: theme.textSecondary }]}>
						{isLoading ? "…" : "—"}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={[styles.title, { color: theme.text }]}>
					{location.name}
				</Text>
				{temperature !== undefined && (
					<Text style={[styles.temp, { color: theme.textSecondary }]}>
						{temperature} °C
					</Text>
				)}
				{condition && (
					<Text style={[styles.weather, { color: theme.textSecondary }]}>
						{condition}
					</Text>
				)}
			</View>
			<View style={styles.actions}>
				{icon && (
					<MaterialDesignIcons
						name={icon as IconName}
						size={40}
						color={theme.textSecondary}
					/>
				)}
				<IconButton
					name="map-marker"
					isActive={isCurrentLocation}
					size={24}
					onPress={() => setCurrentLocation(location)}
				/>

				<IconButton name="close" size={24} onPress={removeFavorite} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
	},
	info: {
		flex: 1,
		gap: 2,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	title: {
		fontSize: 20,
	},
	temp: {
		fontSize: 16,
	},
	weather: {
		fontSize: 12,
	},
});
