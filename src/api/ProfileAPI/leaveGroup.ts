import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/leaveGroup`;

export const leaveGroup = async (chatId: number): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({chatId}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error leaving group.' };
        }

        return { success: true, message: 'Left Group' };
    } catch (error) {
        console.error('Error leaving group:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
