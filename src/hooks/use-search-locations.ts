import { useQuery } from "@tanstack/react-query";
import Api from "@/api";
import type { TLocation } from "@/types";
import { useDebounce } from "./use-debounce";

type TSearchLocationsResponse = {
	results: TLocation[];
	generationtime_ms: number;
};

export const useSearchLocations = (query: string) => {
	const api = new Api();

	const searchLocation = async (
		query: string,
	): Promise<TSearchLocationsResponse> => {
		if (!query) return { results: [], generationtime_ms: 0 };

		const response = await fetch(
			`${api.searchLoactionUrl}?name=${encodeURIComponent(query)}`,
		);
		if (!response.ok) throw new Error("Search failed");

		return response.json();
	};

	const debouncedQuery = useDebounce(query, 500);

	return useQuery({
		queryKey: ["locations", debouncedQuery],
		queryFn: () => searchLocation(debouncedQuery),
		enabled: query.trim().length > 0,
	});
};
