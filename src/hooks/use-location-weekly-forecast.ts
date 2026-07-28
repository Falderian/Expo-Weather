import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Api from "@/api";
import type { DailyItem, TDailyForecastResponse, TLocation } from "@/types";

export const useLocationWeeklyForecast = (loc: TLocation | null) => {
	const api = new Api();

	const fetchWeeklyForecastForLocation = async (
		loc: TLocation,
	): Promise<TDailyForecastResponse> => {
		const url = api.getWeeklyForecastUrl(loc.latitude, loc.longitude);
		const response = await fetch(url);
		if (!response.ok) throw new Error("Weekly forecast fetch failed");
		return response.json();
	};

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["weekly-forecast", loc?.id, loc?.latitude, loc?.longitude],
		queryFn: async () => {
			if (!loc) return;
			return fetchWeeklyForecastForLocation(loc);
		},
		enabled: !!loc,
	});

	const dailyData = useMemo(() => {
		if (!data?.daily) return [];
		return data.daily.time.map((time, index) => ({
			time,
			weatherCode: data.daily.weather_code[index],
			tempMax: data.daily.temperature_2m_max[index],
			tempMin: data.daily.temperature_2m_min[index],
			feelsLikeMax: data.daily.apparent_temperature_max[index],
			feelsLikeMin: data.daily.apparent_temperature_min[index],
			precipitationSum: data.daily.precipitation_sum[index],
			precipitationProbability: data.daily.precipitation_probability_max[index],
			sunrise: new Date(data.daily.sunrise[index]),
			sunset: new Date(data.daily.sunset[index]),
			windSpeedMax: data.daily.wind_speed_10m_max[index],
			windGustsMax: data.daily.wind_gusts_10m_max[index],
		})) as DailyItem[];
	}, [data]);

	return { dailyData, isLoading, isError, refetch };
};
