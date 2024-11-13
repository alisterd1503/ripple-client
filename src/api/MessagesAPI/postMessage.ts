const API_URL = "http://localhost:5002/api/postMessage"

export const postMessage = async (chatId: number, message: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                chatId: chatId,
                message: message
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting message:', error);
        return null;
    }
};