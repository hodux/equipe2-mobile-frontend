import { Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { TouchableOpacity } from 'react-native'
import { Link, useFocusEffect, useRouter} from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'
import { getIdFromJwt } from '../lib/axios'

const index = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    // Navigate to /movies if JWT is valid
    useFocusEffect(
        React.useCallback(() => {
            const checkJWT = async () => {
                try {
                    const id = await getIdFromJwt();
                    if (!id) {
                        console.log("No JWT");
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.log("Error while checking JWT:", error);
                    return false;
                }
            };

            checkJWT().then((hasJWT) => {
                if (hasJWT) {
                    router.push(`/(tabs)/movies`);
                }
            });
        }, [router])
    );

    return (
        <View className={`flex-1 p-5 justify-evenly items-center`} style={{backgroundColor:colors.background_c1}} >
            <Text className={`text-4xl font-bold text-center`} style={{color:colors.primary}}>Welcome to Howah!</Text>
            <Text className={`font-bold text-center`}>Learn more about your favorite movies, in the comfort of your home</Text>

            <TouchableOpacity className={`rounded-3xl p-6`} style={{backgroundColor:colors.primary}} onPress={() => { router.push("./(tabs)/movies")}}>
                <Text className={`text-4xl`} style={{color:colors.lightText}}>Get started !</Text>
            </TouchableOpacity>

            <Text class="text-3xl font-bold underline" style={{color:colors.text}}>
                If you don't already have an account. <Link style={{color:colors.link}} href="./auth/signup"> Sign-up</Link>
            </Text>
        </View>
    )
}


export default index