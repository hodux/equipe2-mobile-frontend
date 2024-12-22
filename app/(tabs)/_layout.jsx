import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {useTheme} from "../../contexts/ThemeContext";
import {colorsPalette} from "../../assets/colorsPalette";

export default function TabsLayout() {
    const { theme } = useTheme()
    const colors = colorsPalette[theme];
    return (
            <Tabs screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.background_c1, // Set the tab bar background color
                },
                tabBarActiveTintColor: colors.secondary, // Active tab text/icon color
                tabBarInactiveTintColor: '#888888', // Inactive tab text/icon color
                headerStyle: {
                    backgroundColor: colors.background_c1, // Set the header background color
                },
                headerTintColor: colors.text, // Set the header text/icon color
            }}>
                <Tabs.Screen
                    name="movies"
                    options={{
                        tabBarLabel: "Movies",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="film" color={color} size={size} />
                        ),
                    }}

                />
                <Tabs.Screen
                    name="[user]/profile"
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
    );
}
