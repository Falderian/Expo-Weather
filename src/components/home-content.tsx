import SegmentedControl from "@expo/ui/community/segmented-control";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { CurrentWeatherContent } from "@/components/current-weather-content";
import { ThemedView } from "@/components/themed-view";
import { ForecastWeather } from "./forecast-weather";

export const HomeContent = () => {
	const [currentTab, setCurrentTab] = useState(0);

	return (
		<ThemedView style={styles.container}>
			{currentTab === 0 && <CurrentWeatherContent />}
			{currentTab === 1 && <ForecastWeather />}
			<SegmentedControl
				values={["Current", "Forecast"]}
				selectedIndex={currentTab}
				onChange={(event) => {
					setCurrentTab(event.nativeEvent.selectedSegmentIndex);
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
