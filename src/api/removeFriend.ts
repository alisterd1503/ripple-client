const API_URL = 'http://localhost:5002/api/removeFriend';

interface Response {
    success: boolean;
    message: string;
}

export const removeFriend = async (chatId: number): Promise<Response> => {
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
            return { success: false, message: errorData.message || 'Error removing friend.' };
        }

        return { success: true, message: 'Friend Removed' };
    } catch (error) {
        console.error('Error removing friend:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
