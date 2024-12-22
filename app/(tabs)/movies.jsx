import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity,} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring,} from 'react-native-reanimated';
import {router} from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useTheme} from "../../contexts/ThemeContext";
import {colorsPalette} from "../../assets/colorsPalette";

export default function MovieScreen() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovies, setSelectedMovies] = useState([]);

    // Theme
    const { theme } = useTheme();
    const colors = colorsPalette[theme];

    // Fetch movies from API
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/movies`);
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies().then(() => {
            console.log('Fetched all movies successfully');
        });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fffff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background_c1 }]}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                numColumns={2}
                extraData={selectedMovies}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        selectedMovies={selectedMovies}
                        setSelectedMovies={setSelectedMovies}
                    />
                )}
            />
        </View>
    );
}

// This should in components, but i'm lazy
const MovieCard = ({ movie, selectedMovies, setSelectedMovies }) => {
    const scale = useSharedValue(1);
    const height = useSharedValue(200);
    const [imageLoading, setImageLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    // Theme
    const { theme } = useTheme();
    const colors = colorsPalette[theme];

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        height: height.value,
    }));

    const handlePress = () => {
        const movieExists = selectedMovies.find((selectedMovie) => selectedMovie.id === movie.id);

        if (movieExists) {
            setSelectedMovies(selectedMovies.filter((selectedMovie) => selectedMovie.id !== movie.id));
            scale.value = withSpring(1);
            height.value = withSpring(200);
        } else {
            setSelectedMovies([...selectedMovies, movie]);
            scale.value = withSpring(1.1);
            height.value = withSpring(425);
        }
    };

    const handleDetailsPress = () => {
        console.log(`Details for ${movie.id}`);
        router.push(`../${movie.id}/detail/`);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            {/* Using TouchableWithoutFeedback to hide TouchableOpacity feedback */}
            <Animated.View style={[styles.card, animatedStyle, selectedMovies.find((selectedMovie) => selectedMovie.id === movie.id) && styles.expandedCard]}>
                {/* Loading for individual cards */}
                <View style={styles.imageContainer}>
                    {imageLoading && (
                        <ActivityIndicator
                            size="large"
                            color="#fffff"
                            style={styles.imageLoading}
                        />
                    )}
                    <Image
                        source={{ uri: movie.primaryImage }}
                        style={styles.poster}
                        onLoad={handleImageLoad}
                    />
                </View>

                <Text style={[{ color: colors.text }]}>{movie.title}</Text>
                {selectedMovies.find((selectedMovie) => selectedMovie.id === movie.id) && (
                    <View style={styles.details}>
                        <Text style={styles.detailsText}>Rating: {movie.contentRating ? movie.contentRating : "N/A"}</Text>
                        <Text style={styles.detailsText}>Score: {movie.averageRating ? movie.averageRating : "N/A"} <FontAwesome name="star" size={12} color="black" /> </Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={handleDetailsPress}>
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    card: {
        flex: 1,
        margin: 25,
        marginVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    expandedCard: {
        zIndex: 1,
        marginBottom: 0,
        marginTop: 0,
    },
    imageContainer: {
        position: 'relative',
        width: width / 2.5,
        height: width / 1.6,
    },
    imageLoading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
    poster: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    movieTitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 14,
        color: '#333',
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
