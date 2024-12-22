// CustomDrawerHeader.jsx
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorsPalette } from '../assets/colorsPalette';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFavoriteMovieContext} from "../contexts/favoriteMovieContext";


const CustomDrawerHeader = ({navigation}) => {
  const { theme, toggleTheme} = useTheme();
  const {favoriteMovie} = useFavoriteMovieContext();
  const colors = colorsPalette[theme];
  return (
    <SafeAreaView style={[styles.header,{backgroundColor:colors.background}]}>
        
        <TouchableOpacity style={[styles.content]} onPress={() => {navigation.openDrawer();}}>
        <Text>
            <Icon name="bars" size={30} color={colors.text}/>
        </Text>
      </TouchableOpacity>
      <View className="flex-row">
          <Icon name="heart" size={30} color="red" solid={true}/>
          <Text style={[styles.title,{color:colors.alert}]}> : {favoriteMovie}</Text>
      </View>

      <TouchableOpacity style={[styles.content]} onPress={() => {toggleTheme()}}>
        <Text>
            <Icon name={theme == 'light' ? "moon" : "sun"} size={30} color={colors.text}/>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content:{
    heigth:56,
    width:56,
    justifyContent:"center",
    alignItems:"center",
    fontSize:30
  }
});

export default CustomDrawerHeader;