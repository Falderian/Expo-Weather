import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
import type { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type IconButtonProps = {
	/** Name of the Material Design icon to render. */
	name: ComponentProps<typeof MaterialDesignIcons>["name"];
	/** Icon size in points. Defaults to 24. */
	size?: number;
	/**
	 * Called when the button is pressed.
	 * When omitted, the icon renders as a plain icon without a Pressable wrapper.
	 */
	onPress?: () => void;
	/**
	 * Theme color token for the icon tint.
	 * Defaults to "text".
	 */
	themeColor?: ThemeColor;
	/** Disables the press. Ignored when `onPress` is not set. */
	disabled?: boolean;
};

/**
 * A theme-aware icon button wrapping `MaterialDesignIcons`.
 *
 * When `onPress` is provided the icon is wrapped in a `Pressable` with
 * pressed-state feedback (opacity reduction). Without `onPress` the icon
 * renders standalone — useful for decorative or static icons.
 */
export function IconButton({
	name,
	size = 24,
	onPress,
	themeColor = "text",
	disabled,
}: IconButtonProps) {
	const theme = useTheme();

	if (!onPress) {
		return (
			<MaterialDesignIcons name={name} size={size} color={theme[themeColor]} />
		);
	}

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
		>
			<MaterialDesignIcons name={name} size={size} color={theme[themeColor]} />
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
