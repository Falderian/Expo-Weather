import { useQuery } from "@tanstack/react-query";
import {
	getCurrentPositionAsync,
	requestForegroundPermissionsAsync,
} from "expo-location";
import { Store } from "@/store";

export const useUserLocation = () => {
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ["userLocation"],
		queryFn: async () => {
			const { status } = await requestForegroundPermissionsAsync();
			if (status !== "granted") {
				throw new Error("Permission to access location was denied");
			}
			const location = await getCurrentPositionAsync({});
			await Store.save("my-location", JSON.stringify(location));
			return location;
		},
		enabled: false,
		staleTime: 0,
	});

	return {
		requestLocation: refetch,
		location: data,
		error,
		isLoading,
	};
};
