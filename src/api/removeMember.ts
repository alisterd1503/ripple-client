import { ResponseModel } from "../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/removeMember`

export const removeMember = async ( chatId: number, userId: number): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ chatId, userId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error removing member.' };
        }

        return { success: true, message: 'Removed Member' };
    } catch (error) {
        console.error('Error removing member:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
