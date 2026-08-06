import { Link, useTheme } from "expo-router";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useCurrentLocation } from "@/hooks/use-current-location";

export type HeaderProps = {
	rightSlots?: ReactNode;
};

export const Header = ({ rightSlots }: HeaderProps) => {
	const theme = useTheme();

	const { currentLocation } = useCurrentLocation();
	const title = currentLocation?.name || "-";
	const subtitle = "Current Location";

	return (
		<ThemedView
			type="background"
			style={{
				...styles.container,
				borderBottomColor: theme.colors.background,
				borderBottomWidth: 2,
			}}
		>
			<Link href="/location">
				<View style={styles.leftSide}>
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
			</Link>

			<View style={styles.rightSide}>{rightSlots}</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
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
