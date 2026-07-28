import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { fmtTime } from "@/utils";
import { ThemedText } from "../themed-text";

export const SunCell = ({
	sunrise,
	sunset,
}: {
	sunrise: Date;
	sunset: Date;
}) => {
	const theme = useTheme();

	return (
		<View style={styles.dataCell}>
			<View style={styles.dataGroup}>
				<MaterialDesignIcons
					name="weather-sunset-up"
					size={14}
					color={theme.textSecondary}
				/>
				<ThemedText style={styles.dataText}>{fmtTime(sunrise)}</ThemedText>
			</View>
			<View style={styles.dataGroup}>
				<MaterialDesignIcons
					name="weather-sunset-down"
					size={14}
					color={theme.textSecondary}
				/>
				<ThemedText style={styles.dataText}>{fmtTime(sunset)}</ThemedText>
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
	dataText: {
		fontSize: 11,
		fontWeight: "500",
	},
});
