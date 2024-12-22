import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

export default function MoviesScreen() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

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

        fetchMovies().then(() => { console.log("Fetched all movies successfully") })
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movies</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.primaryImage }} style={styles.poster} />
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    card: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    poster: {
        width: width / 2.5,
        height: width / 2,
        borderRadius: 10,
        marginBottom: 10,
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
});
