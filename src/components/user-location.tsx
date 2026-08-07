import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useUserLocation } from "@/hooks/use-user-location";
import { ForecastCard } from "./forecast/ForecastCard";
import { ThemedText } from "./themed-text";

export const UserLocation = () => {
	const theme = useTheme();

	const { requestLocation } = useUserLocation();

	return (
		<ForecastCard
			isCurrent={true}
			style={styles.container}
			onPress={requestLocation}
		>
			<ThemedText>Use my location</ThemedText>
			<MaterialDesignIcons
				name="crosshairs-gps"
				size={24}
				color={theme.accentPurple}
			/>
		</ForecastCard>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		padding: 5,
	},
});
