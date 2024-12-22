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
                    backgroundColor: colors.background_c1,
                },
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: '#888888',
                headerStyle: {
                    backgroundColor: colors.background_c1,
                },
                headerTintColor: colors.text,
            }}>
                <Tabs.Screen
                    name="movies"
                    options={{
                        title: "Movies",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="film" color={color} size={size} />
                        ),
                    }}

                />
                <Tabs.Screen
                name="[movie]/detail"
                options={{
                    title: 'Detail',
                    tabBarButton: () => null,
                }}
                />
                <Tabs.Screen
                    name="[user]/profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" color={color} size={size} />
                        ),
                    }}
                />

            </Tabs>
    );
}
