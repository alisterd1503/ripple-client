import { ResponseModel } from "../../models/ResponseModel";
const API_URL = "http://localhost:5002/api/updateUsername"

export const updateUsername = async ( username: string): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error updating username.' };
        }

        return { success: true, message: 'Updated username' };
    } catch (error) {
        console.error('Error updating username:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
