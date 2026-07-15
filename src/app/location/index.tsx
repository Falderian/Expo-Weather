import { useNativeState } from "@expo/ui";
import { StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { FavoriteRow } from "@/components/location/favorite-row";
import { SearchLocation } from "@/components/location/search-locations";
import { useFavoriteLocations } from "@/hooks/use-favorite-locations";

const LocationScreen = () => {
	const openSearch = useNativeState(false);

	const { favoriteLocations, removeFavorite } = useFavoriteLocations();

	return (
		<View style={styles.container}>
			<Header
				title="Select city"
				showBack
				rightSlots={
					<IconButton
						name="map-search"
						isActive={openSearch.value}
						size={20}
						onPress={() => {
							openSearch.value = !openSearch.value;
						}}
					/>
				}
			/>
			{openSearch.value ? (
				<SearchLocation />
			) : (
				<View>
					{favoriteLocations.map((loc) => (
						<FavoriteRow
							key={loc.id}
							location={loc}
							removeFavorite={() => removeFavorite(loc.id)}
						/>
					))}
				</View>
			)}
		</View>
	);
};

export default LocationScreen;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 10,
	},
});
