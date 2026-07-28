import { useCallback, useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import { Colors, Spacing } from "@/constants/theme";
import { useFavoriteLocations } from "@/hooks/use-favorite-locations";
import { useSearchLocations } from "@/hooks/use-search-locations";
import type { TLocation } from "@/types";
import { IconButton } from "../icon-button";
import { ThemedText } from "../themed-text";

export const SearchLocation = () => {
	const [query, setQuery] = useState("");
	const handleChangeText = useCallback((value: string) => {
		"worklet";
		setQuery(value);
	}, []);
	const { favoriteLocations, addFavorite, removeFavorite } =
		useFavoriteLocations();

	const { data, isError, isFetching } = useSearchLocations(query);

	const hasQuery = query.trim().length > 0;
	const results = data?.results ?? [];
	const showEmpty = hasQuery && !isFetching && !isError && results.length === 0;

	const getIcon = useCallback(
		(loc: TLocation) => {
			const isLocationInFavorites = favoriteLocations.find(
				(el) => el.id === loc.id,
			);
			const name = isLocationInFavorites ? "minus" : "plus";
			const action = isLocationInFavorites
				? () => removeFavorite(loc.id)
				: () => addFavorite(loc);

			return <IconButton name={name} onPress={action} />;
		},
		[favoriteLocations, addFavorite, removeFavorite],
	);

	const locationRow = (loc: TLocation) => {
		const Icon = getIcon(loc);
		return (
			<Pressable key={loc.id} style={styles.resultRow}>
				<View style={styles.resultInfo}>
					<ThemedText type="default">{loc.name}</ThemedText>
					<ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
						{[loc.admin1, loc.country].filter(Boolean).join(", ")}
					</ThemedText>
				</View>
				<ThemedText
					type="smallBold"
					themeColor="textSecondary"
					style={styles.countryCode}
				>
					{Icon}
				</ThemedText>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={query}
				placeholder="City name…"
				onChangeText={handleChangeText}
				style={styles.searchInput}
				placeholderTextColor={Colors.dark.textSecondary}
				autoFocus
			/>
			<View style={styles.resultsContainer}>
				{isFetching && <ThemedText>Loading...</ThemedText>}
				{isError && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">
							Something went wrong. Try again.
						</ThemedText>
					</View>
				)}
				{showEmpty && !isFetching && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">No cities found.</ThemedText>
					</View>
				)}
				{results.length > 0 && (
					<ScrollView style={styles.resultsScroll}>
						{results.map(locationRow)}
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	host: { flex: 1 },
	searchInput: {
		fontSize: 16,
		paddingHorizontal: Spacing.two,
		paddingVertical: Spacing.one,
		borderRadius: Spacing.one,
		borderWidth: 1,
		borderColor: Colors.light.backgroundSelected,
		outlineWidth: 1,
		outlineColor: Colors.light.active,
	},

	resultsContainer: {
		flex: 1,
	},
	status: {
		alignItems: "center",
		paddingTop: Spacing.five,
	},

	resultsScroll: {
		flex: 1,
		paddingHorizontal: Spacing.one,
	},
	resultRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: Spacing.three,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.dark.backgroundSelected,
	},
	resultInfo: {
		flex: 1,
	},
	countryCode: {
		marginLeft: Spacing.two,
		opacity: 0.5,
	},
});
