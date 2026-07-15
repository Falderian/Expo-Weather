import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { HomeContent } from "@/components/home-content";
import { IconButton } from "@/components/icon-button";
import { useCurrentLocation } from "@/hooks/use-current-location";

export default function HomeScreen() {
	const { currentLocation } = useCurrentLocation();

	return (
		<View style={styles.container}>
			<Header
				title={currentLocation?.name || "-"}
				subtitle="Current Location"
				rightSlots={
					<Link href="/location">
						<IconButton name="cog" size={20} />
					</Link>
				}
			/>
			<HomeContent />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
