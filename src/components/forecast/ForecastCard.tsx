import type { ReactNode } from "react";
import { type StyleProp, TouchableOpacity, type ViewStyle } from "react-native";
import { rgba } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface ForecastCardProps {
	isCurrent?: boolean;
	isWarning?: boolean;
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

export const ForecastCard = ({
	isCurrent,
	isWarning,
	style,
	children,
	onPress,
}: ForecastCardProps) => {
	const theme = useTheme();
	const purple = theme.accentPurple;
	const cyan = theme.accentCyan;

	return (
		<TouchableOpacity
			activeOpacity={onPress ? 0.7 : 1}
			disabled={!onPress}
			onPress={onPress}
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
		</TouchableOpacity>
	);
};
