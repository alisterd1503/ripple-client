const API_URL = `${process.env.REACT_APP_API_URL}/api/postMessage`;

export const postMessage = async (chatId: number, message: string, file: File | null): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('chatId', chatId.toString());
        if (message) formData.append('message', message);
        if (file) formData.append('image', file);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
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
