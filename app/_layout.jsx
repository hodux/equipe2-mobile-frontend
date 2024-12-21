import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";
import CustomDrawerHeader from "../components/CustomDrawerHeader";
import {Drawer} from "expo-router/drawer";

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
          <GestureHandlerRootView className="flex-1" >
              <Drawer
                  screenOptions={{
                      swipeEnabled:true,
                      // headerShown:false,
                      header: ({navigation}) => <CustomDrawerHeader navigation={navigation} tabName={""} />
                  }
                  }>
                  <Drawer.Screen name="index" options={{headerShown:false}}/>
                  <Drawer.Screen name="camera/index" options={{headerShown:false, drawerItemStyle: { display: 'none' }}} />
                  <Drawer.Screen name="auth" options={{headerShown:false}} />
                  <Drawer.Screen name="[user]/profile_with_blocks" options={{headerShown:false, drawerItemStyle: { display: 'none' }}} />
                  <Drawer.Screen name="(tabs)" options={{headerShown:false, drawerItemStyle: { display: 'none' }}} />
                  <Drawer.Screen name="[user]/profile" options={{ drawerItemStyle: { display: 'none' }}} />
              </Drawer>
          </GestureHandlerRootView>
      </>
  )
}

export default RootLayout

