import { ResponseModel } from "../models/ResponseModel";
import { UserModel } from "../models/UserModel";
const API_URL = 'http://localhost:5002/api/startGroupChat'

interface StartGroupChatModel {
    users: UserModel[],
    title: string | null,
    description: string | null,
    avatar: File | null,
}

export const startGroupChat = async (body: StartGroupChatModel): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({body}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error creating group.' };
        }

        return { success: true, message: 'Created Group' };
    } catch (error) {
        console.error('Error starting new group chat:', error);
        return { success: false, message: 'Network error or server unavailable.'};
    }
};