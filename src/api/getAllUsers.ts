import { UserModel } from "../models/UserModel";

const API_URL = "http://localhost:5002/api/getAllUsers";

export const getAllUsers = async (): Promise<UserModel[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};
