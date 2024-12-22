import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";
import CustomDrawerHeader from "../components/CustomDrawerHeader";
import {Drawer} from "expo-router/drawer";
import {FavoriteMovieProvider} from "../contexts/favoriteMovieContext";

const RootLayout = () => {
  return (
    <ThemeProvider>
        <FavoriteMovieProvider>
            <Layout/>
        </FavoriteMovieProvider>
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
                      header: ({navigation}) => <CustomDrawerHeader navigation={navigation} />
                  }
                  }>
                  <Drawer.Screen name="index" options={{title:"Home", headerShown:false}}/>
                  <Drawer.Screen name="camera/index" options={{headerShown:false, drawerItemStyle: { display: 'none' }}} />
                  <Drawer.Screen name="auth" options={{ title:"Authentication", headerShown:false}} />
                  <Drawer.Screen name="(tabs)" options={{drawerItemStyle: { display: 'none' }}} />
                  <Drawer.Screen name="[movie]/detail" />
              </Drawer>
          </GestureHandlerRootView>
      </>
  )
}

export default RootLayout

