import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
// @ts-ignore
import Index from '../../app/index';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import {useFavoriteMovieContext} from "../../contexts/favoriteMovieContext";

jest.mock('../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));

jest.mock('../../contexts/favoriteMovieContext', () => ({
    useFavoriteMovieContext: jest.fn(),
}));
jest.mock('../../lib/axios', () => ({
    getIdFromJwt: jest.fn(),
    getFavoriteMovies: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    Link: jest.fn(),
    useFocusEffect: jest.fn((callback) => callback()), // Mock the useFocusEffect to immediately trigger the effect
}));

beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});
describe('Index Component with mocked functions ', () => {
    const mockRouter = { push: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue(mockRouter);
        useTheme.mockReturnValue({ theme: 'light' });
        useFavoriteMovieContext.mockReturnValue({favoriteMovie: 'Red One'});

    });

    afterEach(() => {
    });

    it('displays the title ', () => {
        // Mock the theme context to return a specific theme

        const { getByText } = render(<Index/>);

        // Check if the text "ChatMV" is rendered with correct style based on the theme
        expect(getByText('Welcome to Howah!')).toBeTruthy();
    });
    it('when button "Get started !" is pressed it redirect to ./(tabs)/movies', async () => {
        // Mock the theme context to return a specific theme

        const { getByText } = render(<Index/>);
        fireEvent.press(getByText('Get started !'));
        await waitFor(() => {

            expect(mockRouter.push).toHaveBeenCalledWith("./(tabs)/movies");
        });
    });
    it('when button "Sign-up" is pressed it redirect to ./auth/signup', async () => {
        const { getByText } = render(<Index/>);
        const textElement = getByText("If you don't already have an account.");
        expect(textElement).toBeTruthy();
        fireEvent.press(getByText('Sign-up'));
        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith("./auth/signup");
        });

    });
})