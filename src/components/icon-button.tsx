import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/use-theme";

export type IconButtonProps = {
	name: ComponentProps<typeof MaterialDesignIcons>["name"];
	size?: number;
	onPress?: () => void;
	isActive?: boolean;
	disabled?: boolean;
};

export function IconButton({
	name,
	size = 24,
	onPress,
	isActive = false,
	disabled,
}: IconButtonProps) {
	const theme = useTheme();

	const color = isActive ? theme.active : theme.textSecondary;

	if (!onPress) {
		return <MaterialDesignIcons name={name} size={size} color={color} />;
	}

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
		>
			<MaterialDesignIcons name={name} size={size} color={color} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
	pressed: {
		opacity: 0.7,
	},
});
