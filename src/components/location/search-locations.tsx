import { type ObservableState, ScrollView, useNativeState } from "@expo/ui";
import { useCallback } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors, Spacing } from "@/constants/theme";
import { useSearchLocations } from "@/hooks/use-search-locations";
import type { TLocation } from "@/types";
import { IconButton } from "../icon-button";
import { ThemedText } from "../themed-text";

type Props = {
	favoriteLocations: ObservableState<TLocation[]>;
};

export const SearchLocation = ({ favoriteLocations }: Props) => {
	const query = useNativeState("");
	const handleChangeText = useCallback(
		(value: string) => {
			"worklet";
			query.value = value;
		},
		[query],
	);

	const { data, isError, isFetching } = useSearchLocations(query.value);

	const hasQuery = query.value.trim().length > 0;
	const results = data?.results ?? [];
	const showEmpty = hasQuery && !isFetching && !isError && results.length === 0;

	const addLocationToFavorites = (location: TLocation) => {
		favoriteLocations.value = [location, ...favoriteLocations.value];
	};

	const removeLocationFromFavorites = (locId: number) =>
		(favoriteLocations.value = favoriteLocations.value.filter(
			(el) => el.id !== locId,
		));

	const getIcon = (loc: TLocation) => {
		const isLocationInFavorites = favoriteLocations.value.find(
			(el) => el.id === loc.id,
		);
		const name = isLocationInFavorites ? "minus" : "plus";
		const action = isLocationInFavorites
			? () => removeLocationFromFavorites(loc.id)
			: () => addLocationToFavorites(loc);

		return <IconButton name={name} onPress={action} />;
	};

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
		<>
			<TextInput
				value={query.value}
				placeholder="City name…"
				onChangeText={handleChangeText}
				style={styles.searchInput}
				placeholderTextColor={Colors.dark.textSecondary}
				autoFocus
			/>
			<View>
				{isError && (
					<View style={styles.status}>
						<ThemedText themeColor="textSecondary">
							Something went wrong. Try again.
						</ThemedText>
					</View>
				)}
				{showEmpty && (
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
		</>
	);
};

const styles = StyleSheet.create({
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
