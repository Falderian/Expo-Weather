import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type IconName = ComponentProps<typeof MaterialDesignIcons>["name"];

type ContentStateProps =
	| {
			type: "loading";
			message?: string;
	  }
	| {
			type: "empty" | "error";
			icon: IconName;
			message: string;
	  };

export const ContentState = (props: ContentStateProps) => {
	const theme = useTheme();

	return (
		<ThemedView style={styles.container}>
			{props.type === "loading" ? (
				<ActivityIndicator size="large" color={theme.active} />
			) : (
				<MaterialDesignIcons
					name={props.icon}
					size={48}
					color={theme.textSecondary}
				/>
			)}
			<ThemedText themeColor="textSecondary" style={styles.message}>
				{props.message ?? (props.type === "loading" ? "Loading..." : "")}
			</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: Spacing.three,
		paddingHorizontal: Spacing.five,
	},
	message: {
		textAlign: "center",
		lineHeight: 22,
	},
});
