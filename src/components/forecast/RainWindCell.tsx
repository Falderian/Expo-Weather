import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import type { DailyItem } from "@/types";
import { ThemedText } from "../themed-text";

export const RainWindCell = ({
	item,
	isPrecipWarning,
}: {
	item: DailyItem;
	isPrecipWarning: boolean;
}) => {
	const theme = useTheme();

	return (
		<View style={styles.dataCell}>
			<View style={styles.dataGroup}>
				<MaterialDesignIcons
					name="weather-rainy"
					size={14}
					color={theme.textSecondary}
				/>
				<ThemedText
					style={[
						styles.dataText,
						isPrecipWarning && {
							color: theme.accentCyan,
							fontWeight: "700",
						},
					]}
				>
					{Math.round(item.precipitationProbability)}%
				</ThemedText>
			</View>
			<ThemedText style={styles.dotSeparator}>{"•"}</ThemedText>
			<View style={styles.dataGroup}>
				<MaterialDesignIcons
					name="weather-windy"
					size={14}
					color={theme.textSecondary}
				/>
				<ThemedText style={styles.dataText}>
					{Math.round(item.windSpeedMax)}
					<ThemedText style={styles.unitText}>km/h</ThemedText>
				</ThemedText>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dataCell: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		gap: 6,
	},
	dataGroup: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	dotSeparator: {
		fontSize: 10,
		opacity: 0.4,
		fontWeight: "bold",
	},
	dataText: {
		fontSize: 11,
		fontWeight: "500",
	},
	unitText: {
		fontSize: 9,
		opacity: 0.6,
	},
});
