class Api {
	apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API;

	forecastUrl = "https://api.open-meteo.com/v1/forecast";
	searchLoactionUrl = "https://geocoding-api.open-meteo.com/v1/search";

	getCurrentWeatherurl(latitude: number, longitude: number) {
		return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover,visibility,dew_point_2m,is_day&daily=sunrise,sunset`;
	}
}

export default Api;
