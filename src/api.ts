class Api {
	apiKey = process.env.EXPO_PUBLIC_OPEN_WEATHER_API;

	forecastUrl = "https://api.open-meteo.com/v1/forecast";
	searchLoactionUrl = "https://geocoding-api.open-meteo.com/v1/search";

	getCurrentWeatherurl(latitude: number, longitude: number) {
		return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover,visibility,dew_point_2m,is_day&daily=sunrise,sunset`;
	}

	getForecastUrl(latitude: number, longitude: number, forecastDays = 1) {
		return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,apparent_temperature,weather_code,wind_speed_10m&forecast_days=${forecastDays}`;
	}

	getWeeklyForecastUrl(latitude: number, longitude: number) {
		return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max&forecast_days=7`;
	}
}

export default Api;
