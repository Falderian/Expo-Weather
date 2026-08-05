import { useTheme } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "@/components/icon-button";
import { FavoriteRow } from "@/components/location/favorite-row";
import { SearchResultRow } from "@/components/location/search-result-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useFavoriteLocations } from "@/hooks/use-favorite-locations";
import { useSearchLocations } from "@/hooks/use-search-locations";
import type { TLocation } from "@/types";

type SearchMode = "favorites" | "api";

const LocationTab = () => {
	const [query, setQuery] = useState("");
	const [mode, setMode] = useState<SearchMode>("favorites");
	const { colors } = useTheme();

	const { favoriteLocations, addFavorite, removeFavorite } =
		useFavoriteLocations();

	const { data, isError, isFetching } = useSearchLocations(
		mode === "api" ? query : "",
	);

	const handleChangeText = useCallback((value: string) => {
		setQuery(value);
	}, []);

	const toggleMode = useCallback(() => {
		setMode((prev) => (prev === "favorites" ? "api" : "favorites"));
	}, []);

	const filteredFavorites = favoriteLocations.filter((loc) => {
		const searchString =
			`${loc.name} ${loc.admin1 || ""} ${loc.country || ""}`.toLowerCase();
		return searchString.includes(query.toLowerCase().trim());
	});

	const isFavoritesMode = mode === "favorites";
	const results = isFavoritesMode ? filteredFavorites : (data?.results ?? []);
	const showEmpty =
		!isFetching && !isError && query.trim().length > 0 && results.length === 0;

	const renderRow = useCallback(
		({ item }: { item: TLocation }) =>
			isFavoritesMode ? (
				<FavoriteRow
					location={item}
					removeFavorite={() => removeFavorite(item.id)}
				/>
			) : (
				<SearchResultRow
					location={item}
					isFavorite={favoriteLocations.some((el) => el.id === item.id)}
					onToggleFavorite={(loc) =>
						favoriteLocations.some((el) => el.id === loc.id)
							? removeFavorite(loc.id)
							: addFavorite(loc)
					}
				/>
			),
		[isFavoritesMode, favoriteLocations, addFavorite, removeFavorite],
	);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					value={query}
					placeholder={
						isFavoritesMode
							? "Search your favorites…"
							: "Search cities worldwide…"
					}
					onChangeText={handleChangeText}
					style={[
						styles.searchInput,
						{
							borderColor: colors.primary,
							outlineColor: colors.primary.toString(),
						},
					]}
					placeholderTextColor={colors.text}
					autoFocus
				/>
				<IconButton
					name={"map-search-outline"}
					onPress={toggleMode}
					isActive={!isFavoritesMode}
				/>
			</View>

			<View style={styles.resultsContainer}>
				{isFetching && !isFavoritesMode && <ThemedText>Loading...</ThemedText>}
				{isError && !isFavoritesMode && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">
							Something went wrong. Try again.
						</ThemedText>
					</View>
				)}
				{showEmpty && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">
							{isFavoritesMode ? "No matching favorites." : "No cities found."}
						</ThemedText>
					</View>
				)}
				{results.length > 0 && (
					<FlatList
						data={results}
						renderItem={renderRow}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={styles.listContent}
						showsVerticalScrollIndicator={false}
					/>
				)}
				{!isFavoritesMode && query.trim() === "" && !isFetching && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">
							Type a city name to search.
						</ThemedText>
					</View>
				)}
			</View>
		</ThemedView>
	);
};

export default LocationTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		paddingHorizontal: Spacing.two,
		paddingTop: Spacing.two,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.one,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		paddingHorizontal: Spacing.two,
		paddingVertical: Spacing.one,
		borderRadius: Spacing.one,
		borderWidth: 1,
		outlineWidth: 1,
	},
	toggleIcon: {
		padding: Spacing.one,
	},
	resultsContainer: {
		flex: 1,
	},
	status: {
		alignItems: "center",
		paddingTop: Spacing.five,
	},
	listContent: {
		paddingBottom: Spacing.two,
	},
});
