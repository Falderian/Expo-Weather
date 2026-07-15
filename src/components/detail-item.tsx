import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { IconName } from "@/types";
import { ThemedText } from "./themed-text";

export const DetailItem = ({
	icon,
	label,
	value,
}: {
	icon: IconName;
	label: string;
	value: string;
}) => {
	const theme = useTheme();

	return (
		<View style={detailStyles.item}>
			<View style={detailStyles.textGroup}>
				<MaterialDesignIcons
					name={icon}
					size={20}
					color={theme.textSecondary}
				/>
				<ThemedText type="small" themeColor="textSecondary">
					{label}
				</ThemedText>
			</View>
			<ThemedText type="smallBold">{value}</ThemedText>
		</View>
	);
};

const detailStyles = StyleSheet.create({
	item: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	textGroup: {
		flexDirection: "row",
		gap: Spacing.half,
	},
});
