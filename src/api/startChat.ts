import { UserModel } from "../models/userModel";

const API_URL = 'http://localhost:5002/api/startChat'

export const startChat = async (body: UserModel): Promise<void> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error starting new chat:', error);
    }
};