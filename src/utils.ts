import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons";

export const WeatherCodes: Record<number, string> = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Depositing rime fog",
	51: "Light drizzle",
	53: "Moderate drizzle",
	55: "Dense drizzle",
	56: "Light freezing drizzle",
	57: "Dense freezing drizzle",
	61: "Slight rain",
	63: "Moderate rain",
	65: "Heavy rain",
	66: "Light freezing rain",
	67: "Heavy freezing rain",
	71: "Slight snow fall",
	73: "Moderate snow fall",
	75: "Heavy snow fall",
	77: "Snow grains",
	80: "Slight rain showers",
	81: "Moderate rain showers",
	82: "Violent rain showers",
	85: "Slight snow showers",
	86: "Heavy snow showers",
	95: "Thunderstorm",
	96: "Thunderstorm with slight hail",
	99: "Thunderstorm with heavy hail",
};

export const WeatherIcons: Record<number, MaterialDesignIconsIconName> = {
	0: "weather-sunny",
	1: "weather-sunny",
	2: "weather-partly-cloudy",
	3: "weather-cloudy",
	45: "weather-fog",
	48: "weather-fog",
	51: "weather-rainy",
	53: "weather-rainy",
	55: "weather-pouring",
	56: "weather-snowy-rainy",
	57: "weather-snowy-rainy",
	61: "weather-rainy",
	63: "weather-rainy",
	65: "weather-pouring",
	66: "weather-snowy-rainy",
	67: "weather-snowy-rainy",
	71: "weather-snowy",
	73: "weather-snowy",
	75: "weather-snowy-heavy",
	77: "weather-snowy",
	80: "weather-partly-rainy",
	81: "weather-pouring",
	82: "weather-pouring",
	85: "weather-partly-snowy",
	86: "weather-snowy-heavy",
	95: "weather-lightning",
	96: "weather-lightning-rainy",
	99: "weather-hail",
};

export const fmtTime = (d: Date) =>
	d.toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "2-digit",
	});

export const relativeTime = (timestamp: number): string => {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "just now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
};

const TEMP_COLD = 10;
const TEMP_HOT = 25;

export const getTempColor = (
	temp: number,
	colors: { cold: string; hot: string; mid: string },
) => {
	if (temp <= TEMP_COLD) return colors.cold;
	if (temp >= TEMP_HOT) return colors.hot;
	return colors.mid;
};
