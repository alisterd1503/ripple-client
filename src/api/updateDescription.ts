import { ResponseModel } from "../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/updateDescription`

export const updateDescription = async ( chatId: number, description: string): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ chatId, description }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error updating description.' };
        }

        return { success: true, message: 'Updated Description' };
    } catch (error) {
        console.error('Error updating description:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
