import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {useGlobalSearchParams, useRouter} from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import {fetchMovieById} from "../../lib/axios";
import YouTubeIframe from 'react-native-youtube-iframe';
import Detail from "../../app/(tabs)/[movie]/detail";
import {useFavoriteMovieContext} from "../../contexts/favoriteMovieContext";

jest.mock('../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));
jest.mock('../../contexts/favoriteMovieContext', () => ({
    useFavoriteMovieContext: jest.fn(),
}));
jest.mock('../../lib/axios', () => ({
    fetchMovieById: jest.fn(),
}));
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useGlobalSearchParams: jest.fn(),
}));
jest.mock('react-native-youtube-iframe', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
}));
jest.mock('react-native-vector-icons/FontAwesome5', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));
beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});
describe('Detail Component with mocked functions ', () => {
    const mockRouter = {push: jest.fn()};
    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue(mockRouter);
        useTheme.mockReturnValue({theme: 'light'});
        useFavoriteMovieContext.mockReturnValue({favoriteMovie: 'Red One'});
    });

    it('displays a movie ', async () => {
        const mockMovie = { id: 1, url:'P5ieIbInFpg' ,title: 'Gladiator', primaryImage:"", description:"A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", startYear:2000, runtimeMinutes:155, contentRating:"R", averageRating:8.5 };
        fetchMovieById.mockResolvedValueOnce(mockMovie);
        const mockGlob = { movie: 1 };
        useGlobalSearchParams.mockReturnValue(mockGlob);
        const {getByText} = render(<Detail/>);

        await waitFor(() => {
            expect(getByText('Gladiator')).toBeTruthy();
            expect(getByText('Rating : 4.25/5')).toBeTruthy();
            expect(getByText('Year : 2000')).toBeTruthy();
            expect(getByText('Content rating : R')).toBeTruthy();
            expect(getByText('Length : 155 min')).toBeTruthy();
        });
    });
    it('Press button watch trailer should open the trailer modal', async () => {
        const mockMovie = { id: 1, url:'P5ieIbInFpg' ,title: 'Gladiator', primaryImage:"", description:"A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", startYear:2000, runtimeMinutes:155, contentRating:"R", averageRating:8.5 };
        fetchMovieById.mockResolvedValueOnce(mockMovie);
        const mockGlob = { movie: 1 };
        useGlobalSearchParams.mockReturnValue(mockGlob);
        const {getByText,queryByText} = render(<Detail/>);

        fireEvent.press(getByText('Watch Trailer'));

        await waitFor(async () => {
            expect(getByText('Close')).toBeTruthy();

        });

        fireEvent.press(getByText('Close'));
        await waitFor(() => {
            expect(queryByText('Close')).toBeNull();
        });
    });
});