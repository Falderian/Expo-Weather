export interface TLocation {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	admin1: string;
	admin1_id: number;
	country: string;
	country_code: string;
	country_id: number;
	elevation: number;
	feature_code: string;
	population: number;
	timezone: string;
}

export type TCurrentWeatherResponse = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: {
		time: string;
		interval: string;
		temperature_2m: string;
		precipitation: string;
		rain: string;
		relative_humidity_2m: string;
		weather_code: string;
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		precipitation: number;
		rain: number;
		relative_humidity_2m: number;
		weather_code: number;
	};
};
