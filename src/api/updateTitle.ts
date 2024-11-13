import { ResponseModel } from "../models/ResponseModel";
const API_URL = "http://localhost:5002/api/updateTitle"

export const updateTitle = async ( chatId: number, title: string): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, chatId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error updating title.' };
        }

        return { success: true, message: 'Updated title' };
    } catch (error) {
        console.error('Error updating title:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
