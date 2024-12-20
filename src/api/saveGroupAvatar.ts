const API_URL = `${process.env.REACT_APP_API_URL}/api/uploadGroupPhoto`

export const uploadGroupPhoto = async (chatId: number, avatar: File): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        // Use FormData to upload files
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('chatId', String(chatId));

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
        console.error('Error uploading photo:', error);
        return null;
    }
};
