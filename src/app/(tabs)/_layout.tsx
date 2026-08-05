import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Tabs, useTheme } from "expo-router";
import { Header } from "@/components/header";

const TabLayout = () => {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				header: () => <Header />,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Current",
					tabBarIcon: ({ color }) => (
						<MaterialDesignIcons size={28} name="clock-outline" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="forecast-weather"
				options={{
					title: "Forecast",
					tabBarIcon: ({ color }) => (
						<MaterialDesignIcons
							size={28}
							name="calendar-clock-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="location"
				options={{
					title: "Location",
					tabBarIcon: ({ color }) => (
						<MaterialDesignIcons
							size={28}
							name="map-marker-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="ai"
				options={{
					title: "AI",
					tabBarIcon: ({ color }) => (
						<MaterialDesignIcons
							size={28}
							name="creation-outline"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
