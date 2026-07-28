import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { PRECIP_WARNING_THRESHOLD, rgba } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { HourlyItem } from "@/types";
import { fmtTime, getTempColor, WeatherIcons } from "@/utils";
import { ForecastCard } from "./forecast/ForecastCard";
import { PrecipBadge } from "./forecast/PrecipBadge";
import { ThemedText } from "./themed-text";

export type { HourlyItem };

export const HourlyColumn = ({
	item,
	isCurrent,
}: {
	item: HourlyItem;
	isCurrent: boolean;
}) => {
	const theme = useTheme();
	const isWarning = item.precipitationProbability >= PRECIP_WARNING_THRESHOLD;

	return (
		<ForecastCard
			isCurrent={isCurrent}
			isWarning={isWarning}
			style={styles.columnLayout}
		>
			<View style={styles.timeContainer}>
				<ThemedText style={styles.time} themeColor="textSecondary">
					{isCurrent ? "NOW" : fmtTime(item.time)}
				</ThemedText>
			</View>

			<MaterialDesignIcons
				name={WeatherIcons[item.weatherCode] ?? "weather-cloudy"}
				size={32}
				color={theme.text}
			/>

			<ThemedText
				style={[
					styles.tempText,
					{
						color: getTempColor(item.temperature, {
							cold: theme.tempCold,
							hot: theme.tempHot,
							mid: theme.accentPurple,
						}),
					},
				]}
			>
				{Math.round(item.temperature)}°
			</ThemedText>

			<ThemedText style={styles.feelsLike} themeColor="textSecondary">
				{Math.round(item.apparentTemperature)}°
			</ThemedText>

			<View
				style={[
					styles.footerLayout,
					{
						borderTopWidth: 1,
						borderTopColor: rgba(theme.accentPurple, 0.15),
					},
				]}
			>
				<PrecipBadge
					probability={item.precipitationProbability}
					iconSize={12}
					warningFontWeight="600"
					textStyle={styles.footerText}
				/>
				<View style={styles.footerItem}>
					<MaterialDesignIcons
						name="weather-windy"
						color={theme.textSecondary}
					/>
					<ThemedText style={styles.footerText}>
						{Math.round(item.windSpeed)}
					</ThemedText>
				</View>
			</View>
		</ForecastCard>
	);
};

const styles = StyleSheet.create({
	columnLayout: {
		width: 80,
		alignItems: "center",
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
	footerLayout: {
		width: "100%",
	},
	footerItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	footerText: {
		fontSize: 10,
	},
});
