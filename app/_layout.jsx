import { StyleSheet, Text, View } from 'react-native'
import { Drawer } from 'expo-router/drawer';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const RootLayout = () => {
    return (
        <Layout/>
    )
}

const Layout = () => {
    return (
        <>
            <GestureHandlerRootView className="flex-1" >
                <Drawer>
                    <Drawer.Screen name="index" options={{ headerShown:false }} />
                </Drawer>
            </GestureHandlerRootView>
        </>
    )
}

export default RootLayout