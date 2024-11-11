import { UserModel } from "../models/UserModel";

const API_URL = 'http://localhost:5002/api/startGroupChat'

export const startGroupChat = async (chosenUsers: UserModel[], title: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({chosenUsers, title}),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error starting new group chat:', error);
    }
};