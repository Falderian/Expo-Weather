import { useQuery } from "@tanstack/react-query";
import Api from "@/api";
import type { TCurrentWeatherResponse, TLocation } from "@/types";

export const useLocationCurrWeather = (loc: TLocation | null) => {
	const api = new Api();

	const fetchWeatherForLocation = async (
		loc: TLocation,
	): Promise<TCurrentWeatherResponse> => {
		const response = await fetch(
			api.getCurrentWeatherurl(loc.latitude, loc.longitude),
		);
		if (!response.ok) throw new Error("Weather fetch failed");
		return response.json();
	};

	return useQuery({
		queryKey: ["weather", loc?.id, loc?.latitude, loc?.longitude],
		queryFn: async () => {
			if (!loc) return;
			return fetchWeatherForLocation(loc);
		},
		enabled: !!loc,
	});
};
