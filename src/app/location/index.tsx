import { Text, useNativeState } from "@expo/ui";
import { StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { SearchLocation } from "@/components/searchLocations";
import type { TLocation } from "@/types";

const Location = () => {
	const openSearch = useNativeState(false);

	const favoriteLocations = useNativeState<TLocation[]>([]);

	return (
		<View style={styles.container}>
			<Header
				title="Select city"
				showBack
				rightSlots={
					<IconButton
						name="map-search"
						size={20}
						onPress={() => {
							openSearch.value = !openSearch.value;
						}}
					/>
				}
			/>
			{openSearch.value ? (
				<SearchLocation
					addLocationToFavorite={(location: TLocation) =>
						favoriteLocations.value.unshift(location)
					}
				/>
			) : (
				<View>
					{favoriteLocations.value.map((loc) => {
						return <Text key={loc.id}>{loc.name}</Text>;
					})}
				</View>
			)}
		</View>
	);
};

export default Location;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 10,
	},
});
