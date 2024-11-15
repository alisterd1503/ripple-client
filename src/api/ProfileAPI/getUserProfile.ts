const API_URL = `${process.env.REACT_APP_API_URL}/api/getUserProfile`;

export const getUserProfile = async (chatId: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}?chatId=${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: any = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return [];
    }
};
