import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/favouriteChat`;

interface FavouriteChatModel {
    isFavourite: boolean;
    chatId?: number;
    userId?: number;
}

export const favouriteChat = async ({ isFavourite, chatId, userId }: FavouriteChatModel): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ chatId, userId, isFavourite }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || (isFavourite ? 'Error favouriting chat.' : 'Error unfavouriting chat') };
        }

        return { success: true, message: (isFavourite ? 'Favourited chat.' : 'Unfavourited chat') };
    } catch (error) {
        console.error((isFavourite ? 'Error favouriting chat.' : 'Error unfavouriting chat'), error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
