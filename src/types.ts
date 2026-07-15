import type MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";

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
		apparent_temperature: string;
		precipitation: string;
		rain: string;
		relative_humidity_2m: string;
		weather_code: string;
		wind_speed_10m: string;
		wind_direction_10m: string;
		wind_gusts_10m: string;
		pressure_msl: string;
		cloud_cover: string;
		visibility: string;
		dew_point_2m: string;
		is_day: string;
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		apparent_temperature: number;
		precipitation: number;
		rain: number;
		relative_humidity_2m: number;
		weather_code: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		wind_gusts_10m: number;
		pressure_msl: number;
		cloud_cover: number;
		visibility: number;
		dew_point_2m: number;
		is_day: number;
	};
	daily_units: {
		time: string;
		sunrise: string;
		sunset: string;
	};
	daily: {
		time: string[];
		sunrise: string[];
		sunset: string[];
	};
};

export type IconName = ComponentProps<typeof MaterialDesignIcons>["name"];
