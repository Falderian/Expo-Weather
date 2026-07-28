import MaterialDesignIcons, {
	type MaterialDesignIconsIconName,
} from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, type TextStyle, View } from "react-native";

import { PRECIP_WARNING_THRESHOLD } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemedText } from "../themed-text";

interface PrecipBadgeProps {
	probability: number;
	iconName?: MaterialDesignIconsIconName;
	iconSize?: number;
	recolorIconOnWarning?: boolean;
	warningFontWeight?: "600" | "700";
	textStyle?: TextStyle;
}

export const PrecipBadge = ({
	probability,
	iconName = "water",
	iconSize = 12,
	recolorIconOnWarning = true,
	warningFontWeight = "600",
	textStyle,
}: PrecipBadgeProps) => {
	const theme = useTheme();
	const isWarning = probability >= PRECIP_WARNING_THRESHOLD;
	const iconColor =
		isWarning && recolorIconOnWarning ? theme.accentCyan : theme.textSecondary;

	return (
		<View style={styles.row}>
			<MaterialDesignIcons name={iconName} size={iconSize} color={iconColor} />
			<ThemedText
				style={[
					textStyle,
					isWarning && {
						color: theme.accentCyan,
						fontWeight: warningFontWeight,
					},
				]}
			>
				{Math.round(probability)}%
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
