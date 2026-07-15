import { useNativeState } from "@expo/ui";
import SegmentedControl from "@expo/ui/community/segmented-control";
import { StyleSheet } from "react-native";
import { CurrentWeatherContent } from "@/components/current-weather-content";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export const HomeContent = () => {
	const selected = useNativeState(0);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.content}>
				{selected.value === 0 && <CurrentWeatherContent />}
				{selected.value === 1 && (
					<ThemedView style={styles.wip}>
						<ThemedText themeColor="textSecondary">
							Detailed weather coming soon
						</ThemedText>
					</ThemedView>
				)}
				{selected.value === 2 && (
					<ThemedView style={styles.wip}>
						<ThemedText themeColor="textSecondary">
							Forecast coming soon
						</ThemedText>
					</ThemedView>
				)}
			</ThemedView>
			<SegmentedControl
				values={["Current", "Detailed", "Forecast"]}
				selectedIndex={selected.value}
				onChange={(event) => {
					selected.value = event.nativeEvent.selectedSegmentIndex;
				}}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	wip: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
