import { UserModel } from "../models/UserModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/startChat`

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