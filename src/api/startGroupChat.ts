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

        const formData = new FormData();
        if (body.avatar) formData.append('avatar', body.avatar);
        formData.append('title', String(body.title));
        formData.append('description', String(body.description));

        body.users.forEach((user, index) => {
            formData.append(`users[${index}]`, JSON.stringify(user));
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
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