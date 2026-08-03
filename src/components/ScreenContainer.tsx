import { StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./themed-view";

interface Props {
	children: React.ReactNode;
	style?: ViewStyle;
	edges?: ("top" | "bottom" | "left" | "right")[];
}

export const ScreenContainer = ({ children, style }: Props) => {
	const insets = useSafeAreaInsets();
	return (
		<ThemedView
			style={[
				styles.container,
				{
					paddingTop: insets.top,
				},
				style,
			]}
		>
			{children}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 20 },
});
