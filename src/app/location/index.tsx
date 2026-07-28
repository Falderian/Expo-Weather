import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { FavoriteRow } from "@/components/location/favorite-row";
import { SearchLocation } from "@/components/location/search-locations";
import { ThemedView } from "@/components/themed-view";
import { useFavoriteLocations } from "@/hooks/use-favorite-locations";

const LocationScreen = () => {
	const [openSearch, setOpenSearch] = useState(false);

	const { favoriteLocations, removeFavorite } = useFavoriteLocations();
	return (
		<ThemedView style={styles.container}>
			<Header
				title="Select city"
				showBack
				rightSlots={
					<IconButton
						name="map-search"
						isActive={openSearch}
						size={20}
						onPress={() => {
							setOpenSearch((p) => !p);
						}}
					/>
				}
			/>
			{openSearch ? (
				<SearchLocation />
			) : (
				<View style={styles.favoritesList}>
					{favoriteLocations.map((loc) => (
						<FavoriteRow
							key={loc.id}
							location={loc}
							removeFavorite={() => removeFavorite(loc.id)}
						/>
					))}
				</View>
			)}
		</ThemedView>
	);
};

export default LocationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	favoritesList: {
		flex: 1,
	},
});
