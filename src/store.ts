import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TLocation } from "@/types";

type FavoritesState = {
	favoriteLocations: TLocation[];
	addFavorite: (location: TLocation) => void;
	removeFavorite: (locId: number) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set) => ({
			favoriteLocations: [],
			addFavorite: (location) =>
				set((s) => ({
					favoriteLocations: [location, ...s.favoriteLocations],
				})),
			removeFavorite: (locId) =>
				set((s) => ({
					favoriteLocations: s.favoriteLocations.filter(
						(el) => el.id !== locId,
					),
				})),
		}),
		{
			name: "favoriteLocations",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

type CurrentLocationState = {
	currentLocation: TLocation | null;
	setCurrentLocation: (location: TLocation | null) => void;
};

export const useCurrentLocationStore = create<CurrentLocationState>()(
	persist(
		(set) => ({
			currentLocation: null,
			setCurrentLocation: (location) => set({ currentLocation: location }),
		}),
		{
			name: "currentLocation",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
