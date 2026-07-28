import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

import { rgba } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemedView } from "../themed-view";

interface ForecastCardProps {
	isCurrent?: boolean;
	isWarning?: boolean;
	style?: ViewStyle;
	children: ReactNode;
}

export const ForecastCard = ({
	isCurrent,
	isWarning,
	style,
	children,
}: ForecastCardProps) => {
	const theme = useTheme();
	const purple = theme.accentPurple;
	const cyan = theme.accentCyan;
	return (
		<ThemedView
			style={[
				{
					borderWidth: 2,
					borderRadius: 8,
					borderColor: rgba(purple, 0.15),
				},
				isCurrent && {
					backgroundColor: rgba(purple, 0.15),
					borderColor: rgba(purple, 0.4),
				},
				isWarning && {
					backgroundColor: rgba(cyan, 0.12),
					borderColor: rgba(cyan, 0.35),
				},
				style,
			]}
		>
			{children}
		</ThemedView>
	);
};
