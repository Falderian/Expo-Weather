import { useEffect, useMemo, useRef } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { ForecastCard } from "@/components/forecast/ForecastCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
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

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "high":
				return "#FF3B30";
			case "medium":
				return "#FF9F0A";
			default:
				return "#007AFF";
		}
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Weather Insight</ThemedText>

			{isLoading ? (
				<ForecastCard style={styles.centerCard}>
					<ActivityIndicator size="large" color={Colors.dark.active} />
				</ForecastCard>
			) : isError ? (
				<ForecastCard style={styles.centerCard}>
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
				</ForecastCard>
			) : (
				<ThemedView style={styles.insightsList}>
					{summary && summary.length > 0 ? (
						summary.map((item) => (
							<ForecastCard
								key={item.days + item.advice}
								style={[
									styles.card,
									{
										borderLeftColor: getSeverityColor(item.severity),
										borderLeftWidth: 5,
									},
								]}
							>
								<View style={styles.insightContent}>
									<ThemedText style={styles.emoji}>{item.emoji}</ThemedText>
									<View style={styles.textContainer}>
										<ThemedText style={styles.dayText}>{item.days}</ThemedText>
										<ThemedText style={styles.adviceText}>
											{item.advice}
										</ThemedText>
									</View>
								</View>
							</ForecastCard>
						))
					) : (
						<ForecastCard style={styles.centerCard}>
							<ThemedText style={styles.emptyStateText}>
								Smooth sailing this week—no special gear needed.
							</ThemedText>
						</ForecastCard>
					)}
				</ThemedView>
			)}

			<View style={styles.footer}>
				<ThemedText style={styles.footerText}>
					AI can make mistakes. Please verify with a weekly forecast.
				</ThemedText>
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 20,
		marginTop: 20,
	},
	insightsList: {
		width: "100%",
		gap: 12,
	},
	card: {
		width: "100%",
		padding: 8,
	},
	centerCard: {
		width: "100%",
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		minHeight: 150,
	},
	insightContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	emoji: {
		fontSize: 24,
		marginRight: 15,
	},
	textContainer: {
		flex: 1,
	},
	dayText: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 2,
	},
	adviceText: {
		fontSize: 14,
		opacity: 0.8,
		lineHeight: 20,
	},
	emptyStateText: {
		fontSize: 16,
		textAlign: "center",
		opacity: 0.6,
		fontStyle: "italic",
	},
	errorContainer: {
		alignItems: "center",
		justifyContent: "center",
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
	footer: {
		marginTop: "auto",
		paddingBottom: 10,
	},
	footerText: {
		fontSize: 12,
		opacity: 0.5,
		textAlign: "center",
	},
});

export default AiTab;
