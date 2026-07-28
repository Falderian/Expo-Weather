import { StyleSheet, View } from "react-native";
import { PRECIP_WARNING_THRESHOLD, rgba } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { DailyItem } from "@/types";
import { ForecastCard } from "./ForecastCard";
import { RainWindCell } from "./RainWindCell";
import { SunCell } from "./SunCell";
import { WeeklyMainRow } from "./WeeklyMainRow";

export const WeeklyRow = ({
	item,
	isToday,
}: {
	item: DailyItem;
	isToday: boolean;
}) => {
	const theme = useTheme();
	const isPrecipWarning =
		item.precipitationProbability >= PRECIP_WARNING_THRESHOLD;

	return (
		<ForecastCard
			isCurrent={isToday}
			isWarning={isPrecipWarning}
			style={styles.rowLayout}
		>
			<WeeklyMainRow item={item} isToday={isToday} />
			<View
				style={[
					styles.dataBarLayout,
					{
						borderTopWidth: 1,
						borderTopColor: rgba(theme.accentPurple, 0.15),
					},
				]}
			>
				<RainWindCell item={item} isPrecipWarning={isPrecipWarning} />
				<View
					style={{
						width: 1,
						height: 14,
						backgroundColor: rgba(theme.accentPurple, 0.15),
					}}
				/>
				<SunCell sunrise={item.sunrise} sunset={item.sunset} />
			</View>
		</ForecastCard>
	);
};

const styles = StyleSheet.create({
	rowLayout: {
		paddingBottom: 4,
		overflow: "hidden",
	},
	dataBarLayout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		paddingVertical: 4,
		paddingHorizontal: 4,
	},
});
