import { useQuery } from "@tanstack/react-query";
import Api from "@/api";
import type { TForecastResponse, TLocation } from "@/types";

export const useLocationForecast = (loc: TLocation | null) => {
	const api = new Api();

	const fetchForecastForLocation = async (
		loc: TLocation,
	): Promise<TForecastResponse> => {
		const url = api.getForecastUrl(loc.latitude, loc.longitude);
		const response = await fetch(url);
		if (!response.ok) throw new Error("Forecast fetch failed");
		return response.json();
	};

	return useQuery({
		queryKey: ["forecast", loc?.id, loc?.latitude, loc?.longitude],
		queryFn: async () => {
			if (!loc) return;
			return fetchForecastForLocation(loc);
		},
		enabled: !!loc,
	});
};
