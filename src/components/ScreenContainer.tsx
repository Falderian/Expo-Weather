import { StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./themed-view";

interface Props {
	children: React.ReactNode;
	style?: ViewStyle;
	edges?: ("top" | "bottom" | "left" | "right")[];
}

export const ScreenContainer = ({
	children,
	style,
	edges = ["top", "bottom"],
}: Props) => {
	const insets = useSafeAreaInsets();
	return (
		<ThemedView
			style={[
				styles.container,
				{
					paddingTop: edges.includes("top") ? insets.top : 0,
					paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
				},
				style,
			]}
		>
			{children}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
});
