import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export type BaseModalProps = {
	isOpen: boolean;
	setIsOpen: (v: boolean) => void;
	title?: string;
	children?: ReactNode;
};

export const BaseModal = ({
	isOpen,
	setIsOpen,
	title,
	children,
}: BaseModalProps) => {
	return (
		<Modal
			visible={isOpen}
			transparent
			animationType="fade"
			onRequestClose={() => setIsOpen(false)}
		>
			<Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
				<Pressable style={styles.card}>
					<ThemedView type="backgroundElement" style={styles.cardInner}>
						{title && (
							<View style={styles.header}>
								<ThemedText type="subtitle">{title}</ThemedText>
							</View>
						)}

						<View style={styles.body}>{children}</View>

						<View style={styles.footer}>
							<Pressable onPress={() => setIsOpen(false)}>
								<ThemedView
									type="backgroundSelected"
									style={styles.closeButton}
								>
									<ThemedText type="smallBold">Close</ThemedText>
								</ThemedView>
							</Pressable>
						</View>
					</ThemedView>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		justifyContent: "center",
		alignItems: "center",
		padding: Spacing.four,
	},
	card: {
		width: "95%",
		minHeight: "50%",
		maxHeight: "80%",
	},
	cardInner: {
		flex: 1,
		borderRadius: 20,
		overflow: "hidden",
	},

	header: {
		paddingTop: Spacing.four,
		paddingHorizontal: Spacing.four,
	},

	body: {
		flex: 1,
		padding: Spacing.four,
	},

	footer: {
		paddingHorizontal: Spacing.four,
		paddingBottom: Spacing.four,
	},
	closeButton: {
		borderRadius: 12,
		paddingVertical: Spacing.three,
		alignItems: "center",
	},
});
