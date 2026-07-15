import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export const ForecastWeather = () => {
	return (
		<ThemedView style={styles.wip}>
			<ThemedText themeColor="textSecondary">Forecast coming soon</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	wip: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
