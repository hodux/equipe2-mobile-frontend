import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs>
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
                name="profile"
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
