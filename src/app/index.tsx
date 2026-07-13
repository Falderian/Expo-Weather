import { Link } from "expo-router";
import { View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";

export default function HomeScreen() {
	return (
		<View>
			<Header
				title="Hrodna"
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
