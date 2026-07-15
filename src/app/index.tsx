import { Link } from "expo-router";
import { View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { useCurrentLocation } from "@/hooks/use-current-location";

export default function HomeScreen() {
	const { currentLocation } = useCurrentLocation();

	return (
		<View>
			<Header
				title={currentLocation?.name || "-"}
				subtitle="Current Location"
				rightSlots={
					<Link href="/location">
						<IconButton name="cog" size={20} />
					</Link>
				}
			/>
		</View>
	);
}
