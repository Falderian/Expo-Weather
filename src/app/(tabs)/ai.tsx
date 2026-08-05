import { useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { ForecastCard } from "@/components/forecast/ForecastCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAiRequest } from "@/hooks/use-ai-request";
import { useCurrentLocation } from "@/hooks/use-current-location";
import { useLocationWeeklyForecast } from "@/hooks/use-location-weekly-forecast";

const AiTab = () => {
	const { currentLocation } = useCurrentLocation();
	const { dailyData } = useLocationWeeklyForecast(currentLocation);
	const { summarize, summary, isLoading, isError, error, reset } =
		useAiRequest();

	const summarizeRef = useRef(summarize);
	summarizeRef.current = summarize;

	const dailyDataString = useMemo(() => JSON.stringify(dailyData), [dailyData]);

	useEffect(() => {
		if (!dailyDataString || dailyDataString === "{}") return;
		summarizeRef.current(dailyDataString);
	}, [dailyDataString]);

	const handleRetry = () => {
		reset();
		summarizeRef.current(dailyDataString);
	};

	const result = useMemo(() => {
		return renderHighlightedText(summary || "");
	}, [summary]);

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Weather Insight</ThemedText>

			<ForecastCard isCurrent={isError} style={styles.cardLayout}>
				{isLoading ? (
					<ActivityIndicator size="large" style={styles.center} />
				) : isError ? (
					<ThemedView style={styles.errorContainer}>
						<ThemedText style={styles.errorTitle}>
							Something went wrong
						</ThemedText>
						<ThemedText style={styles.errorSubtitle}>
							{error?.message || "We couldn't generate your weather insights."}
						</ThemedText>
						<TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
							<ThemedText style={styles.retryText}>Try Again</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				) : (
					<ThemedText style={styles.summaryText}>
						{result || "No insights available for this forecast."}
					</ThemedText>
				)}
			</ForecastCard>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 20,
		textAlign: "center",
	},
	cardLayout: {
		width: "100%",
		minHeight: 150,
		padding: 20,
		justifyContent: "center",
	},
	summaryText: {
		fontSize: 16,
		lineHeight: 24,
		textAlign: "center",
		opacity: 0.9,
	},
	center: {
		alignSelf: "center",
	},
	errorContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		backgroundColor: "transparent",
	},
	errorTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#FF3B30",
		marginBottom: 8,
		textAlign: "center",
	},
	errorSubtitle: {
		fontSize: 14,
		textAlign: "center",
		opacity: 0.6,
		marginBottom: 20,
	},
	retryButton: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	retryText: {
		color: "white",
		fontWeight: "600",
		fontSize: 14,
	},
});

const renderHighlightedText = (text: string) => {
	if (!text || typeof text !== "string") return null;

	const parts = text.split(/(\*\*.*?\*\*)/g);

	return (
		<>
			{parts.map((part) => {
				if (part.startsWith("**") && part.endsWith("**")) {
					return (
						<ThemedText
							key={part}
							style={{ fontWeight: "bold", color: "#007AFF" }}
						>
							{part.slice(2, -2)}{" "}
						</ThemedText>
					);
				}
				return <ThemedText key={part}>{part}</ThemedText>;
			})}
		</>
	);
};

export default AiTab;
