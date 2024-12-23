import React, { createContext, useContext, useState } from 'react';

const FavoriteMovieContext = createContext();

export const FavoriteMovieProvider= ({ children }) => {
    const [favoriteMovie, setFavoriteMovie] = useState('');

    return (
    <FavoriteMovieContext.Provider value={{ favoriteMovie, setFavoriteMovie }}>
        {children}
    </FavoriteMovieContext.Provider>
    );
};

export const useFavoriteMovieContext = () => {
    return useContext(FavoriteMovieContext);
};