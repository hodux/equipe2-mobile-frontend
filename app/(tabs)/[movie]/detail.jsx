import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from '../../../contexts/ThemeContext'
import { colorsPalette } from '../../../assets/colorsPalette'
import {fetchMovieById, updateFavoriteMovie} from '../../../lib/axios'
import {useGlobalSearchParams, useRouter} from 'expo-router';
import YouTubeIframe from 'react-native-youtube-iframe';
import {Rating} from "react-native-ratings";
import {useFavoriteMovieContext} from "../../../contexts/favoriteMovieContext";
import Icon from "react-native-vector-icons/FontAwesome5";
const detail = () => {
    const { theme } = useTheme()
    const {setFavoriteMovie} = useFavoriteMovieContext();
    const colors = colorsPalette[theme]
    const glob = useGlobalSearchParams();
    const router = useRouter()
    const refresh = useRef(false)
    const [modalVisible, isModalVisible] = useState(false);
    const [movie, setMovie] = useState({
        "id":null,
        "url":"",
        "title":"",
        "primaryImage":"",
        "description":"",
        "startYear":null,
        "endYear":null,
        "runtimeMinutes":null,
        "contentRating":"",
        "averageRating":"",
        "numVotes":null,
        "type":""
    })
    useEffect(() => {
        // Fetch movie data
        const loadData = async () => {
            try{
                console.log(glob.movie);
                const movieData = await fetchMovieById(glob.movie);
                if(!movieData) throw new Error('Failed fetching data -> no Data')
                setMovie(movieData);
            }catch(error){
                console.log('Detail : Failed Loading Movie data : ', error)
            }
        };
        loadData();
    }, [glob.movie]);
    const handleMovieName = async () =>{
        try {
            setFavoriteMovie(movie.title)
            const res = await updateFavoriteMovie(glob.user, movie.title);
            if(!res) throw new Error('Failed updating data -> no Data')
        }catch (error) {
            console.log("Detail.js: Error: " + error);
        }
    }
    return (
        <>
            <ScrollView style={{backgroundColor:colors.background_c1}} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center items-center" >
                    <View className="ml-auto">
                        <TouchableOpacity  onPress={handleMovieName}>
                            <Icon name="heart" size={50} color="red" solid={true}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={{uri: movie.primaryImage}} style={{ width: 200, height: 300, borderRadius: 10 }}/>
                    </View>
                    <View className="p-4 m-4 rounded" style={{backgroundColor:colors.background, color:colors.text}}>
                        <Text style={{color:colors.text, fontStyle:"italic"}} >{movie.description}</Text>
                        <View className="mt-4 align-items-center flex-row">
                            <Text className="mr-4 text-lg font-bold" style={{color:colors.text}}> Rating: {movie.averageRating/2}/5</Text>
                            <Rating
                                type="custom"
                                ratingCount={5}
                                imageSize={20}
                                startingValue={movie.averageRating/2}
                                readonly
                            />
                        </View>
                        <Text className="mr-4 text-lg font-bold" style={{color:colors.text}}> Year : {movie.startYear}</Text>
                        <Text className="mr-4 text-lg font-bold" style={{color:colors.text}}> Content rating : {movie.contentRating}</Text>
                        <Text className="mr-4 text-lg font-bold" style={{color:colors.text}}> Year : {movie.startYear}</Text>
                        <Text className="mr-4 text-lg font-bold" style={{color:colors.text}}> Length : {movie.runtimeMinutes} min</Text>
                    </View>
                    <TouchableOpacity className="p-4 m-4 rounded" style={{backgroundColor:colors.secondary}} onPress={() => isModalVisible(!modalVisible)}>
                        <Text className="text-white text-lg">Watch Trailer</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => isModalVisible(!modalVisible)}>
                        <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="w-11/12 h-1/4 rounded-xl p-4 items-center" style={{backgroundColor:colors.background_c1}}>
                                <YouTubeIframe
                                    videoId={movie.url}
                                    height="100%"
                                    width="100%"
                                    play={modalVisible}
                                    className={"h-full w-full"}/>
                            </View>
                            <TouchableOpacity className="py-3 px-6 rounded m-5" style={{backgroundColor:colors.alert}} onPress={() => isModalVisible(!modalVisible)}>
                                <Text className="text-white text-lg">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </View>

            </ScrollView>
        </>
    )
}
export default detail;