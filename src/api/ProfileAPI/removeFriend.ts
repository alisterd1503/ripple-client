import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/removeFriend`;

export const removeFriend = async (userId: number): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({userId}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error removing friend.' };
        }

        return { success: true, message: 'Friend Removed' };
    } catch (error) {
        console.error('Error removing friend:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
