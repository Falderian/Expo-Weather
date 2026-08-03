import { StyleSheet, TouchableOpacity } from "react-native";
import { rgba } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type StateResponseProps =
	| { state: "loading"; loadingMessage?: string }
	| { state: "error"; errorMessage?: string; onRetry: () => void };

export const StateResponse = (props: StateResponseProps) => {
	const theme = useTheme();

	if (props.state === "loading") {
		return (
			<ThemedView style={styles.center}>
				<ThemedText>{props.loadingMessage ?? "Loading…"}</ThemedText>
			</ThemedView>
		);
	}

	const retryButtonStyle = {
		backgroundColor: rgba(theme.accentPurple, 0.15),
		borderColor: rgba(theme.accentPurple, 0.3),
	};

	return (
		<ThemedView style={styles.center}>
			<ThemedText
				themeColor="textSecondary"
				style={{ textAlign: "center", marginBottom: 12 }}
			>
				{props.errorMessage ?? "Something went wrong"}
			</ThemedText>
			<TouchableOpacity
				onPress={props.onRetry}
				style={[styles.retryButton, retryButtonStyle]}
			>
				<ThemedText style={styles.retryText}>Retry</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	retryButton: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1,
	},
	retryText: {
		fontSize: 14,
		fontWeight: "600",
	},
});
