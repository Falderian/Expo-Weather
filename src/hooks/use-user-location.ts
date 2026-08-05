import { useQuery } from "@tanstack/react-query";
import {
	getCurrentPositionAsync,
	requestForegroundPermissionsAsync,
} from "expo-location";

export const useUserLocation = () => {
	return useQuery({
		queryKey: ["userLocation"],
		queryFn: async () => {
			const { status } = await requestForegroundPermissionsAsync();
			if (status !== "granted") {
				throw new Error("Permission to access location was denied");
			}

			return await getCurrentPositionAsync({});
		},
		enabled: false,
		staleTime: 0,
	});
};
