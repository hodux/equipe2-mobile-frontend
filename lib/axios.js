import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
})

// Function to set the JWT in AsyncStorage
export async function setToken(token) {
    try {
        await AsyncStorage.setItem('jwt', token);
    } catch (error) {
        console.error('Error setting token:', error);
    }
}

// Function to get the JWT from AsyncStorage
export async function getToken() {
    try {
        return await AsyncStorage.getItem('jwt');
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    async (config) => {
        const token = await getToken(); // Retrieve the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function signIn(usernameOrEmail, password){
    try {
        console.log(`axios.js: Trying to signIn with username: ${usernameOrEmail} and password: ${password}`);

        const signInData = {
            usernameEmail: usernameOrEmail,
            password: password
        };

        const userAuth = await api.post(`/login`, signInData,{
            header:{
                Authorization: 'none',
            },
        });
        if(!(userAuth.status == 200)) throw Error;

        console.log(userAuth.data)
        if(userAuth.status === 401) {
            throw new Error("Incorrect username or password");
        }

        // Store the token on successful sign-in
        await setToken(userAuth.data.token);
        return userAuth.data
    } catch (error){
        throw new Error(error)
    }
}

export async function signUp(username, email , password){
    try {
        console.log(`axios.js: Trying to signUp with email: ${email}, username: ${username} and password: ${password}`);

        const signUpData = {
            email:email,
            username: username,
            password: password
        };

        const userAuth = await api.post(`/users`, signUpData,{
            header:{
                Authorization: 'none',
            },
        });
        if(!(userAuth.status === 200 || userAuth.status === 201)) throw Error;
        
        // Store the token on successful sign-up
        if(userAuth.data === "User already exists") {
            console.log("DID NOT CREATE USER THEY ALREADY EXIST")
            throw new Error("User already exists");
        }
        await setToken(userAuth.data.token);
        console.log(userAuth.data);
        return userAuth.data
    } catch (error){
        throw new Error(error)
    }
}

export async function fetchProfileData(id){
    try {
        console.log(`axios.js: Trying to fetch profileData with id: ${id}`);
        
        const profileData = await api.get(`/users/${id}`);
        if(!(profileData.status == 200)) throw Error('Failed to fetch profile');
        return profileData.data
    } catch (error){
        throw new Error(error)
    }
}
export async function updateProfileData(userData){
    try {
        console.log(`axios.js: Trying to update profileData with userData: ${userData}`);
        const updateData = await api.put(`/users/${userData.id}`,userData,{
            header:{
                Authorization: 'none',
            },
            
        });
        if(!(updateData.status == 200)) throw Error;
        
        return updateData.data
    } catch (error){
        throw new Error(error)
    }
} 

export async function deleteUserById(id){
    try{
        console.log(`axios.js : delete user with id : ${id}`)
        const deleteUser = await api.delete(`/users/${id}`)
        if(deleteUser.status != 200){
            throw new Error('axios.js : Failed to delete user')
        }
    }catch(error){
        console.log("Error deleting user : ",error)
        throw new Error(error)
    }
}
export async function getIdFromJwt(){
    try{
        const id = await api.post('/authenticate')
        console.log("Axios.js: got id from jwt")
        if(!id){
            throw new Error('no response : 404')
        }

        if( id.status != 200) throw new Error('responded with error')
        return id.data.id

    }

    catch(error){
        console.log(`axios.js couldn't get JWT : ${error}`)
    }
}
export async function fetchMovies(){
    try{
        console.log(`axios.js : fetchMovies`)
        const movies = await api.get(`/movies`)
        if(movies.status != 200){
            throw new Error('axios.js : Failed to fetch movies')
        }
        return movies.data
    }catch(error){
        console.log("Error fetching : ",error)
    }
}
//Test
// console.log(await fetchMovies());
export async function fetchMovieById(id){
    try{
        console.log(`axios.js : fetchMovies with id : ${id}`)
        const movie = await api.get(`/movie/${id}`);
        if(!(movie.status == 200)) throw new Error(`axios.js: Failed to fetch movie with id : ${id}`);
        return movie.data
    }catch (e) {
        console.log(`Error fetching:` + e);
    }
}
//TEST
//console.log(await fetchMovieById(1));
export async function getFavoriteMovies(id){
    try{
        console.log(`axios.js : fetchFavoriteMovies`);
        const favoriteMovies = await api.get(`/users/movie/${id}`);
        if(!(favoriteMovies.status === 200)) throw new Error(`axios.js: Failed to fetch favorite movie with id : ${id}`);
        return favoriteMovies.data;
    }catch(error){
        console.error('Error fetching the favorite movie '+ error);
    }
}
export async function updateFavoriteMovie(id, title){
    try {
        console.log(`axios.js: Trying to update the user favorite movie with userData: ${title}`);
        const updateData = await api.put(`/users/movie/${id}`,{movieName:title});
        if(!(updateData.status == 200)) throw Error;
        return updateData.data
    } catch (error){
        throw new Error(error)
    }
}