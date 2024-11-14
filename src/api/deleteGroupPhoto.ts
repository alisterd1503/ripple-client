const API_URL = `${process.env.REACT_APP_API_URL}/api/deleteGroupPhoto`

export const deleteGroupPhoto = async (chatId: number): Promise<any> => {
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
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting photo:', error);
        return null;
    }
};
