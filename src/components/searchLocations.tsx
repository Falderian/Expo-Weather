import { ScrollView, useNativeState } from "@expo/ui";
import { useCallback } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors, Spacing } from "@/constants/theme";
import { useSearchLocations } from "@/hooks/use-search-locations";
import type { TLocation } from "@/types";
import { IconButton } from "./icon-button";
import { ThemedText } from "./themed-text";

type Props = {
	addLocationToFavorite: (location: TLocation) => number;
};

export const SearchLocation = ({ addLocationToFavorite }: Props) => {
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
						{results.map((loc, i) => (
							<Pressable key={loc.id} style={styles.resultRow}>
								<View style={styles.resultInfo}>
									<ThemedText type="default">{loc.name}</ThemedText>
									<ThemedText
										type="small"
										themeColor="textSecondary"
										numberOfLines={1}
									>
										{[loc.admin1, loc.country].filter(Boolean).join(", ")}
									</ThemedText>
								</View>
								<ThemedText
									type="smallBold"
									themeColor="textSecondary"
									style={styles.countryCode}
								>
									<IconButton
										name="plus"
										onPress={() => addLocationToFavorite(loc)}
									/>
								</ThemedText>
							</Pressable>
						))}
					</ScrollView>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	searchInput: {
		fontSize: 16,
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.two + 4,
		borderRadius: 10,
		marginBottom: Spacing.three,
		borderWidth: 1,
		borderColor: Colors.light.backgroundSelected,
	},

	status: {
		alignItems: "center",
		paddingTop: Spacing.five,
	},

	resultsScroll: {
		flex: 1,
		marginHorizontal: -Spacing.four,
		paddingHorizontal: Spacing.four,
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
