import { useNativeState } from "@expo/ui";
import SegmentedControl from "@expo/ui/community/segmented-control";
import { StyleSheet } from "react-native";
import { CurrentWeatherContent } from "@/components/current-weather-content";
import { ThemedView } from "@/components/themed-view";
import { ForecastWeather } from "./forecast-weather";

export const HomeContent = () => {
	const selected = useNativeState(0);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.content}>
				{selected.value === 0 && <CurrentWeatherContent />}
				{selected.value === 1 && <ForecastWeather />}
			</ThemedView>
			<SegmentedControl
				values={["Current", "Forecast"]}
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
});
