import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from "../../app/auth/signup";
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import Index from "../../app";
import {signUp} from "../../lib/axios";

jest.mock('../../contexts/ThemeContext', () => ({
    useTheme: jest.fn(),
}));
jest.mock('../../lib/axios', () => ({
    signUp: jest.fn(),
}));
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));
beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});
describe('Index Component with mocked functions ', () => {
    const mockRouter = {push: jest.fn()};
    beforeEach(() => {
        jest.clearAllMocks();
        useRouter.mockReturnValue(mockRouter);
        useTheme.mockReturnValue({theme: 'light'});
    });

    it('displays the title ', () => {
        // Mock the theme context to return a specific theme

        const {getByText} = render(<Signup/>);

        // Check if the text "ChatMV" is rendered with correct style based on the theme
        expect(getByText('Howah')).toBeTruthy();
    });
    it('displays the form ', () => {
        // Mock the theme context to return a specific theme

        const {getByText, getByPlaceholderText} = render(<Signup/>);

        // Check if the text "ChatMV" is rendered with correct style based on the theme
        expect(getByText('Créez votre compte')).toBeTruthy();
        expect(getByPlaceholderText('Entrez votre courriel')).toBeTruthy();
        expect(getByPlaceholderText("Entrez l'identifiant")).toBeTruthy();
        expect(getByPlaceholderText("Entrez le mot de passe")).toBeTruthy();
    });
    // it('when button "Créez le compte" is pressed it redirect to ./(tabs)/movies', async () => {
    //     const mockResponse = {
    //
    //     }
    //     signUp.mockResolvedValue({token: '', id:0, username: '', email: ''});
    //
    //     const { getByText } = render(<Signup/>);
    //     fireEvent.press(getByText('Créez le compte'));
    //     await waitFor(() => {
    //         expect(mockRouter.push).toHaveBeenCalledWith("../(tabs)/0/profile");
    //     });
    // });
});