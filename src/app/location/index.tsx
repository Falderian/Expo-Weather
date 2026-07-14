import { Text, useNativeState } from "@expo/ui";
import { StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { IconButton } from "@/components/icon-button";
import { FavoriteRow } from "@/components/location/favorit-row";
import { SearchLocation } from "@/components/location/search-locations";
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
						isActive={openSearch.value}
						size={20}
						onPress={() => {
							openSearch.value = !openSearch.value;
						}}
					/>
				}
			/>
			{openSearch.value ? (
				<SearchLocation favoriteLocations={favoriteLocations} />
			) : (
				<View>
					{favoriteLocations.value.map((loc) => (
						<FavoriteRow key={loc.id} location={loc} />
					))}
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
