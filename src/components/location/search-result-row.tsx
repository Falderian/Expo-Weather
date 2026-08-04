import { useTheme } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton } from "@/components/icon-button";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import type { TLocation } from "@/types";

type Props = {
	location: TLocation;
	isFavorite: boolean;
	onToggleFavorite: (location: TLocation) => void;
};

export const SearchResultRow = ({
	location,
	isFavorite,
	onToggleFavorite,
}: Props) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={[styles.resultRow, { borderBottomColor: colors.background }]}
		>
			<View style={styles.resultInfo}>
				<ThemedText type="default">{location.name}</ThemedText>
				<ThemedText
					type="small"
					themeColor="textSecondary"
					numberOfLines={1}
				>
					{[location.admin1, location.country].filter(Boolean).join(", ")}
				</ThemedText>
			</View>
			<IconButton
				name={isFavorite ? "minus" : "plus"}
				onPress={() => onToggleFavorite(location)}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	resultRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: Spacing.three,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	resultInfo: {
		flex: 1,
	},
});
