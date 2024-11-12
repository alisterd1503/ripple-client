
const API_URL="http://localhost:5002/api/getUsernameAvatar"

export const getUsernameAvatar = async (): Promise<{username: string, avatar: string}> => {
    try {

        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching username:', error);
        throw error ;
    }
};