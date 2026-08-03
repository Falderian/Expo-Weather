import { useTheme } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "@/components/icon-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useFavoriteLocations } from "@/hooks/use-favorite-locations";
import { useSearchLocations } from "@/hooks/use-search-locations";
import type { TLocation } from "@/types";

type SearchMode = "favorites" | "api";

const LocationScreen = () => {
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

	const getActionIcon = useCallback(
		(loc: TLocation) => {
			if (isFavoritesMode) {
				return (
					<IconButton name="minus" onPress={() => removeFavorite(loc.id)} />
				);
			} else {
				const isFavorite = favoriteLocations.some((el) => el.id === loc.id);
				const name = isFavorite ? "minus" : "plus";
				const action = isFavorite
					? () => removeFavorite(loc.id)
					: () => addFavorite(loc);
				return <IconButton name={name} onPress={action} />;
			}
		},
		[isFavoritesMode, favoriteLocations, addFavorite, removeFavorite],
	);

	const renderLocationRow = ({ item }: { item: TLocation }) => {
		const icon = getActionIcon(item);
		return (
			<Pressable
				style={[styles.resultRow, { borderBottomColor: colors.background }]}
			>
				<View style={styles.resultInfo}>
					<ThemedText type="default">{item.name}</ThemedText>
					<ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
						{[item.admin1, item.country].filter(Boolean).join(", ")}
					</ThemedText>
				</View>
				<ThemedText
					type="smallBold"
					themeColor="textSecondary"
					style={styles.countryCode}
				>
					{icon}
				</ThemedText>
			</Pressable>
		);
	};

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
						renderItem={renderLocationRow}
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

export default LocationScreen;

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
	resultRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: Spacing.three,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	resultInfo: {
		flex: 1,
	},
	countryCode: {
		marginLeft: Spacing.two,
		opacity: 0.5,
	},
});
