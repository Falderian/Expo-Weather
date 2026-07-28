import { Link } from "expo-router";
import { Header } from "@/components/header";
import { HomeContent } from "@/components/home-content";
import { IconButton } from "@/components/icon-button";
import { useCurrentLocation } from "@/hooks/use-current-location";

export default function HomeScreen() {
	const { currentLocation } = useCurrentLocation();

	return (
		<>
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
		</>
	);
}
