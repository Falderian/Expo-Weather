import { router } from "expo-router";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "@/components/icon-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export type HeaderProps = {
	title: string;
	subtitle?: string;
	rightSlots?: ReactNode;
	onBackPress?: () => void;
	showBack?: boolean;
};

export const Header = ({
	title,
	subtitle,
	rightSlots,
	onBackPress,
	showBack,
}: HeaderProps) => {
	const handleBack = onBackPress ?? (() => router.back());

	return (
		<ThemedView type="background" style={styles.container}>
			<View style={styles.leftSide}>
				{showBack && (
					<IconButton name="arrow-left" size={24} onPress={handleBack} />
				)}
				<View style={styles.titleGroup}>
					<ThemedText type="default" numberOfLines={1} style={styles.title}>
						{title}
					</ThemedText>
					{subtitle && (
						<ThemedText
							type="small"
							numberOfLines={1}
							themeColor="textSecondary"
						>
							{subtitle}
						</ThemedText>
					)}
				</View>
			</View>

			<View style={styles.rightSide}>{rightSlots}</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	leftSide: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.one,
		flex: 1,
	},
	titleGroup: {
		flexDirection: "column",
	},
	rightSide: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.one,
	},
	title: {
		fontSize: 18,
		fontWeight: 600,
	},
});
