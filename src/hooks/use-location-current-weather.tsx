import { useQuery } from "@tanstack/react-query";
import Api from "@/api";
import type { TCurrentWeatherResponse, TLocation } from "@/types";

export const useLocationCurrWeather = (loc: TLocation) => {
	const api = new Api();

	const fetchWeather = async (): Promise<TCurrentWeatherResponse> => {
		const response = await fetch(
			api.getCurrentWeatherurl(loc.latitude, loc.longitude),
		);
		if (!response.ok) throw new Error("Weather fetch failed");
		return response.json();
	};

	return useQuery({
		queryKey: ["weather", loc.id, loc.latitude, loc.longitude],
		queryFn: fetchWeather,
		enabled: !!loc?.id,
	});
};
