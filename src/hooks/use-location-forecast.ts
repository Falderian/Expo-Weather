import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Api from "@/api";
import type { HourlyItem, TForecastResponse, TLocation } from "@/types";

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

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["forecast", loc?.id, loc?.latitude, loc?.longitude],
		queryFn: async () => {
			if (!loc) return;
			return fetchForecastForLocation(loc);
		},
		enabled: !!loc,
	});

	const hourlyData = useMemo(() => {
		if (!data?.hourly) return [];
		return data.hourly.time.map((time, index) => ({
			time: new Date(time),
			temperature: data.hourly.temperature_2m[index],
			apparentTemperature: data.hourly.apparent_temperature[index],
			precipitationProbability: data.hourly.precipitation_probability[index],
			precipitation: data.hourly.precipitation[index],
			weatherCode: data.hourly.weather_code[index],
			windSpeed: data.hourly.wind_speed_10m[index],
		})) as HourlyItem[];
	}, [data]);

	const currentHourIndex = useMemo(() => {
		const now = new Date();
		return hourlyData.findIndex(
			(item) => item.time.getHours() === now.getHours(),
		);
	}, [hourlyData]);

	return { hourlyData, currentHourIndex, isLoading, isError, refetch };
};
