class Api {
	apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API;

	forecastUrl = "https://api.open-meteo.com/v1/forecast";
	searchLoactionUrl = "https://geocoding-api.open-meteo.com/v1/search";

	getCurrentWeatherurl(latitude: number, longitude: string) {
		return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,weather_code,relative_humidity_2m`;
	}
}

export default Api;
