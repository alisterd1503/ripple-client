import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/updateBio`

export const updateBio = async ( bio: string): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ bio }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error updating bio.' };
        }

        return { success: true, message: 'Updated Bio' };
    } catch (error) {
        console.error('Error updating bio:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
