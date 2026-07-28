import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { DailyItem } from "@/types";
import { getTempColor, WeatherCodes, WeatherIcons } from "@/utils";
import { ThemedText } from "../themed-text";

export const WeeklyMainRow = ({
	item,
	isToday,
}: {
	item: DailyItem;
	isToday: boolean;
}) => {
	const theme = useTheme();

	const date = useMemo(() => new Date(`${item.time}T00:00:00`), [item.time]);

	return (
		<View style={styles.mainRow}>
			<View style={styles.dateSection}>
				<ThemedText type={isToday ? "smallBold" : "small"}>
					{isToday
						? "Today"
						: date.toLocaleDateString(undefined, { weekday: "short" })}
				</ThemedText>
				<ThemedText
					type="small"
					themeColor="textSecondary"
					style={styles.dateSub}
				>
					{date.toLocaleDateString(undefined, {
						day: "numeric",
						month: "short",
					})}
				</ThemedText>
			</View>

			<View style={styles.weatherSection}>
				<MaterialDesignIcons
					name={WeatherIcons[item.weatherCode] ?? "weather-cloudy"}
					size={24}
					color={theme.text}
				/>
				<ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
					{WeatherCodes[item.weatherCode] ?? "—"}
				</ThemedText>
			</View>

			<View style={styles.tempBlock}>
				<View style={styles.tempRow}>
					<ThemedText
						type="smallBold"
						style={[
							styles.tempMax,
							{
								color: getTempColor(item.tempMax, {
									cold: theme.tempCold,
									hot: theme.tempHot,
									mid: theme.accentPurple,
								}),
							},
						]}
					>
						{Math.round(item.tempMax)}°
					</ThemedText>
					<ThemedText
						type="small"
						style={[
							styles.tempMin,
							{
								color: getTempColor(item.tempMin, {
									cold: theme.tempCold,
									hot: theme.tempHot,
									mid: theme.accentPurple,
								}),
							},
						]}
					>
						{Math.round(item.tempMin)}°
					</ThemedText>
				</View>
				<ThemedText style={[styles.feelsLikeText, { marginTop: 2 }]}>
					{Math.round(item.feelsLikeMax)}° / {Math.round(item.feelsLikeMin)}°
				</ThemedText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Spacing.three,
		paddingTop: Spacing.two,
		paddingBottom: Spacing.one,
	},
	dateSection: {
		width: 65,
	},
	dateSub: {
		fontSize: 11,
		opacity: 0.6,
	},
	weatherSection: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	tempBlock: {
		width: 85,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	tempRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 4,
	},
	tempMax: {
		fontSize: 18,
	},
	tempMin: {
		fontSize: 14,
		opacity: 0.8,
	},
	feelsLikeText: {
		fontSize: 10,
		opacity: 0.5,
		fontWeight: "500",
	},
});
