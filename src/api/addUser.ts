import { ResponseModel } from "../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/addUser`

export const addUser = async ( chatId: number, users: {userId: number, username: string}[]): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ chatId, users }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error adding new user.' };
        }

        return { success: true, message: 'Added New Users' };
    } catch (error) {
        console.error('Error adding new user:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
