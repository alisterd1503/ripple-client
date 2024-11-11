const API_URL = 'http://localhost:5002/api/deleteAccount';

interface Response {
    success: boolean;
    message: string;
}

export const deleteAccount = async (currentPassword: string): Promise<Response> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({currentPassword}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error deleting account.' };
        }

        return { success: true, message: 'Deleted Account' };
    } catch (error) {
        console.error('Error deleting account:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
