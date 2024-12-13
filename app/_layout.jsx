import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext';

// Import your global CSS file
import "../global.css";
import {Stack} from "expo-router";
import {StatusBar} from "react-native";

const RootLayout = () => {
  return (
    <ThemeProvider>
        <Layout/>
    </ThemeProvider>
  )
}
const Layout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </>
  )
}

export default RootLayout

